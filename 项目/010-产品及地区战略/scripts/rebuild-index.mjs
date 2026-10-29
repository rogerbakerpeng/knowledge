import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await fs.readFile(path.join(root, '导入清单.json'), 'utf8'));
const documents = [];
for (const item of manifest.items.filter(x => /^0[1-4]0-/.test(x.target_file))) {
  const text = await fs.readFile(path.join(root, item.target_file), 'utf8');
  const lines = text.split(/\r?\n/);
  const sections = [];
  for (let i=0; i<lines.length; i++) {
    const m = /^(#{1,6}) (.+)$/.exec(lines[i]);
    if (m) sections.push({ title: m[2], level: m[1].length, line_start: i+1 });
  }
  for (let i=0;i<sections.length;i++) {
    const next = sections.slice(i+1).find(s => s.level <= sections[i].level);
    sections[i].line_end = next ? next.line_start-1 : lines.length;
  }
  const tagsMatch = /^tags: (.+)$/m.exec(text);
  const tags = tagsMatch ? JSON.parse(tagsMatch[1]) : [];
  const core = text.split('## 核心结论')[1]?.split(/\n## /)[0] || '';
  const summary = core.split('\n').find(x => x.startsWith('- '))?.slice(2) || '';
  const doc = {
    title: sections[0]?.title || item.source_file,
    document_path: item.target_file,
    source_summary: item.source_file,
    original_source: /^source: (.+)$/m.exec(text)?.[1] || '',
    tags, summary,
    duplicate_of: item.duplicate_of,
    bytes: Buffer.byteLength(text),
    sha256: createHash('sha256').update(text).digest('hex'),
    sections
  };
  const pageindex = '索引/' + path.basename(item.target_file, '.md') + '.pageindex.json';
  doc.section_index = pageindex;
  await fs.writeFile(path.join(root,pageindex), JSON.stringify(doc,null,2)+'\n');
  documents.push(doc);
}
await fs.writeFile(path.join(root,'catalog.json'),JSON.stringify({schema_version:1,index_type:'heading_and_line',documents},null,2)+'\n');
console.log(JSON.stringify({documents:documents.length,sections:documents.reduce((n,d)=>n+d.sections.length,0)}));
