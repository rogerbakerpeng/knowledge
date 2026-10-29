# AI读取与维护说明

## 加载策略

```yaml
entry: index.md
route_by: task
category_indexes:
  - 010-政策与产品/index.md
  - 020-全国市场/index.md
  - 030-广西专题/index.md
  - 040-实施与资源/index.md
catalog: catalog.json
read_order: [专题索引, 分类索引, 目标文档核心结论, 目标章节关键论据]
citation: [document_path, section_title, line_start, line_end]
duplicate_policy: 优先主版本，重复来源不重复计数
```

从知识库根目录index.md找到本专题；按问题选择分类。catalog.json包含标题、原材料来源、标签、首条核心结论和章节行号，section_index指向单篇章节索引。章节line_end包含子章节，行号从1开始。该索引由Markdown标题确定性生成，属于章节定位索引，未调用外部模型生成语义PageIndex。

## 本地检索

在知识库根目录执行：

```powershell
rg -n --glob "*.md" "公平竞争|算力|分散评标" "项目/010-产品及地区战略"
```

没有rg时，可在系统PowerShell中使用：

```powershell
Get-ChildItem -LiteralPath "项目/010-产品及地区战略" -Recurse -Filter *.md |
    Select-String -Pattern "公平竞争|算力|分散评标"
```

命中后先读取同篇“核心结论”，再定位“关键论据”；需要形成工作表时读取“可复用模板”。跨文档观点先看综合导读，引用时仍回正文核对。

## 更新维护

1. 修改或新增摘要，保留来源、统计口径、适用区域和时间；新文档加入导入清单items与所属分类导航。
2. 在导入清单中维护source_file、target_file；重复版本填写duplicate_of。源哈希表示导入时快照，不随正文编辑重写。
3. 已安装Node.js时，在知识库根目录执行：

```powershell
node "项目/010-产品及地区战略/scripts/rebuild-index.mjs"
```

4. 脚本重建catalog.json和每篇章节索引，更新文档SHA-256及行号；检查所有内部链接，再提交Git。删除文档时同步移除对应章节索引与导航。

导入清单中的目标哈希用于校验本次导入快照；后续修改后，以catalog.json中的sha256识别当前正文版本。原始43号令PageIndex保留原生成日期和节点说明，不会被重建脚本覆盖。

返回[专题总索引](index.md)。
