#!/usr/bin/env node
'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const net = require('node:net');
const tls = require('node:tls');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const run = promisify(execFile);
function flags(args) {
  const out = {};
  for (let i=0;i<args.length;i++) {
    if (!args[i].startsWith('--')) throw Error('Expected --option: '+args[i]);
    const k=args[i].slice(2);
    out[k]=args[i+1] && !args[i+1].startsWith('--') ? args[++i] : true;
  }
  return out;
}
function need(o,k) { if(typeof o[k]!=='string'||!o[k])throw Error('Missing --'+k);return o[k]; }
async function exists(p){try{await fs.access(p);return true;}catch{return false;}}
async function file(p){if(!(await fs.stat(p)).isFile())throw Error('Not a file: '+p);return p;}
function xml(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');}
function javaBin(home,name){return path.join(home,'bin',name+(process.platform==='win32'?'.exe':''));}
async function mavenCommand(o,goals,cwd){
  const java=await file(javaBin(path.resolve(need(o,'java-home')),'java'));
  const mh=path.resolve(need(o,'maven-home'));
  const boot=(await fs.readdir(path.join(mh,'boot'))).find(f=>/^plexus-classworlds.*\.jar$/.test(f));
  if(!boot)throw Error('Missing plexus-classworlds in Maven boot/');
  const conf=await file(path.join(mh,'bin','m2.conf'));
  const settings=await file(path.resolve(need(o,'settings')));
  return {java,args:['-Dmaven.home='+mh,'-Dmaven.multiModuleProjectDirectory='+cwd,
    '-Dclassworlds.conf='+conf,'-classpath',path.join(mh,'boot',boot),
    'org.codehaus.plexus.classworlds.launcher.Launcher','-B','-U',
    '-s',settings,'-Dmaven.repo.local='+path.resolve(need(o,'repo')),...goals]};
}
function inspectLog(text){
  const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/);
  const pick=re=>lines.filter(l=>re.test(l)).slice(-12).map(l=>l.slice(0,650));
  return {
    readinessVerdict:'NOT_VERIFIED: combine these signals with HTTP/login verification',
    applicationStarted:pick(/Started .+Application|Root WebApplicationContext: initialization completed/),
    connectorStarted:pick(/Starting ProtocolHandler/),
    licenseAccepted:pick(/验证成功.*(?:机器码|授权文件)/),
    licenseRejected:pick(/所有的授权文件都无效|验证失败.*机器码|请根据此机器码/),
    fatalSignals:pick(/Application run failed|BUILD FAILURE|Error listenerStart|Context .*startup failed/),
    linkageCauses:pick(/(?:Caused by:.*)?(?:NoClassDefFoundError|ClassNotFoundException|NoSuchMethodError|FileNotFoundException.*\.class)/),
    redisErrors:pick(/JedisConnectionException|redisSetting配置是否正确|NOAUTH|WRONGPASS/),
    knownConditionalWarnings:pick(/Invalid byte tag in constant pool: 19|相同的事件源标识|模块表中有脏数据|当前实现未指定业务标识|EpDirtyDataFactory|not eligible for getting processed/),
    schemaUpdateNeedsReview:pick(/更新脚本执行出错|epoint_proc_alter|execute error.*(?:alter|create|drop)/i)
  };
}
function readRedisSetting(text){
  let value;
  for(const line of text.replace(/^\uFEFF/,'').split(/\r?\n/)){
    if(/^\s*[#!]/.test(line))continue;
    const m=/^\s*redisSetting\s*=\s*(.*?)\s*$/.exec(line);
    if(m)value=m[1];
  }
  if(!value)throw Error('No active redisSetting found');
  if(!/^rediss?:\/\//i.test(value))throw Error('MANUAL_CONFIG_REQUIRED: encrypted, cluster or unsupported Redis setting');
  return value;
}
async function redisCheck(setting){
  const u=new URL(setting);
  if(!['redis:','rediss:'].includes(u.protocol))throw Error('Unsupported Redis scheme');
  if(!/^\d*$/.test(u.pathname.slice(1)))throw Error('Unsupported Redis DB path');
  const db=Number(u.pathname.slice(1)||0), host=u.hostname, port=Number(u.port||6379);
  const user=decodeURIComponent(u.username),pass=decodeURIComponent(u.password);
  const s=u.protocol==='rediss:'?tls.connect({host,port,servername:host}):net.createConnection({host,port});
  let pending,buf='',lastError;
  const fail=e=>{lastError=e;if(pending){pending.reject(e);pending=null;}};
  s.on('error',fail);
  s.on('close',()=>fail(Error('Redis connection closed')));
  s.setTimeout(4000,()=>s.destroy(Error('Redis timeout')));
  s.on('data',chunk=>{
    buf+=chunk.toString('utf8');const end=buf.indexOf('\r\n');
    if(end>=0&&pending){const line=buf.slice(0,end);buf=buf.slice(end+2);const p=pending;pending=null;
      if(line[0]==='-')p.reject(Error(line.slice(1)));else p.resolve(line);}
  });
  const command=parts=>new Promise((resolve,reject)=>{
    if(lastError)return reject(lastError);
    pending={resolve,reject};
    s.write('*'+parts.length+'\r\n'+parts.map(v=>'$'+Buffer.byteLength(String(v))+'\r\n'+v+'\r\n').join(''));
  });
  try{
    await new Promise((resolve,reject)=>{s.once(u.protocol==='rediss:'?'secureConnect':'connect',resolve);s.once('error',reject);});
    if(pass){const auth=await command(user?[ 'AUTH',user,pass ]:['AUTH',pass]);if(auth!=='+OK')throw Error('AUTH not OK');}
    if(await command(['SELECT',String(db)])!=='+OK')throw Error('SELECT not OK');
    if(await command(['PING'])!=='+PONG')throw Error('PING not PONG');
    return {ok:true,host,port,db,authentication:pass?'verified':'not-configured',select:'OK',ping:'PONG'};
  }catch(e){throw Error(String(e.message).replaceAll(pass||'\0','[redacted]'));}
  finally{s.destroy();}
}
async function refreshArtifact(o){
  const group=need(o,'group'),artifact=need(o,'artifact'),version=need(o,'version');
  if(!/^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*$/.test(group) ||
    ![artifact,version].every(s=>/^[A-Za-z0-9_][A-Za-z0-9_.-]*$/.test(s)&&!s.includes('..')))
    throw Error('Invalid Maven coordinates');
  const repo=path.resolve(need(o,'repo'));
  const jar=path.resolve(repo,...group.split('.'),artifact,version,artifact+'-'+version+'.jar');
  if(!jar.startsWith(repo+path.sep))throw Error('Artifact escapes repository');
  if(!o.class&&!o.method)throw Error('Specify --class to verify; --method additionally verifies its signature');
  if(!o.class)throw Error('--method requires --class');
  const cls=String(o.class);
  if(!/^[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)+$/.test(cls))throw Error('Invalid class name');
  const jarTool=await file(javaBin(path.resolve(need(o,'java-home')),'jar'));
  const javap=o.method?await file(javaBin(path.resolve(o['java-home']),'javap')):null;
  const tmp=await fs.mkdtemp(path.join(os.tmpdir(),'epoint-jar-refresh-'));
  const cmd=await mavenCommand(o,[
    'org.apache.maven.plugins:maven-dependency-plugin:2.8:get',
    '-Dartifact='+group+':'+artifact+':'+version,'-Dtransitive=false'],tmp);
  if(o['dry-run'])return {dryRun:true,jar,java:cmd.java,args:cmd.args,verification:{class:cls,method:o.method||null}};
  const backup=path.join(tmp,path.basename(jar));
  const had=await exists(jar);
  if(had)await fs.copyFile(jar,backup);
  try{
    if(had)await fs.unlink(jar); // exact verified file only; no recursive deletion
    await run(cmd.java,cmd.args,{cwd:tmp,windowsHide:true,timeout:120000,maxBuffer:4*1024*1024});
    const listing=(await run(jarTool,['tf',jar],{windowsHide:true,maxBuffer:8*1024*1024})).stdout;
    if(!listing.split(/\r?\n/).includes(cls.replaceAll('.','/')+'.class'))throw Error('REFRESHED_VERSION_STILL_MISSING_CLASS: '+cls);
    if(o.method){
      const listing=(await run(javap,['-classpath',jar,cls],{windowsHide:true,maxBuffer:2*1024*1024})).stdout;
      if(!listing.includes(String(o.method)))throw Error('REFRESHED_VERSION_STILL_MISSING_METHOD: '+o.method);
    }
    return {ok:true,coordinate:group+':'+artifact+':'+version,jar,verifiedClass:cls,verifiedMethod:o.method||null,
      backup:had?backup:null,bytes:(await fs.stat(jar)).size,restartRequired:true};
  }catch(e){
    if(had)await fs.copyFile(backup,jar);else if(await exists(jar))await fs.unlink(jar);
    // Do not emit Maven output: it may contain sensitive repository settings.
    throw Error('Artifact refresh failed; original restored='+had+'. '+(e.message||'').split('\n')[0]);
  }
}
async function freePort(start){
  for(let p=start;p<=Math.min(start+100,65535);p++){
    if(await new Promise((resolve,reject)=>{const s=net.createServer();
      s.once('error',e=>e.code==='EADDRINUSE'?resolve(false):reject(e));
      s.listen({host:'127.0.0.1',port:p,exclusive:true},()=>s.close(()=>resolve(true)));
    }))return p;
  }throw Error('No available port in bounded search');
}
async function prepareIdea(o){
  const project=await fs.realpath(path.resolve(need(o,'project')));
  const module=path.resolve(project,need(o,'module'));
  if(module===project||!module.startsWith(project+path.sep))throw Error('Module must be inside project');
  await file(path.join(module,'pom.xml'));
  await file(javaBin(path.resolve(need(o,'java-home')),'java'));
  const mh=path.resolve(need(o,'maven-home'));await file(path.join(mh,'bin','m2.conf'));
  const settings=await file(path.resolve(need(o,'settings')));
  const sdk=need(o,'jdk-name'); // must be an SDK actually registered in this IDEA
  let port=Number(o.port||8081);
  if(!Number.isInteger(port)||port<1||port>65535)throw Error('Invalid port');
  port=await freePort(port);
  const mode=o['agent-mode']||'plugin';
  if(!['plugin','standalone'].includes(mode))throw Error('Use --agent-mode plugin|standalone');
  const vm=['-Dfile.encoding=UTF-8','-Dmaven.tomcat.port='+port];
  if(mode==='standalone')vm.push('-agentpath:'+await file(path.resolve(need(o,'jrebel-dll'))));
  const quote=s=>/\s/.test(s)?'"'+s+'"':s;
  const name=path.basename(module)+'-jrebel-local-'+port;
  const idea=path.join(project,'.idea'), config=path.join(idea,'runConfigurations',name+'.xml');
  if(await exists(config))throw Error('Run configuration exists; inspect/update it instead: '+config);
  const originalFiles=await exists(path.join(project,'pom.xml'))?['pom.xml']:[path.relative(project,path.join(module,'pom.xml')).replaceAll('\\','/')];
  const misc=path.join(idea,'misc.xml');
  const hasMisc=await exists(misc);
  const importXml=originalFiles.map(p=>'<option value="$PROJECT_DIR$/'+xml(p)+'"/>').join('');
  const miscXml='<?xml version="1.0" encoding="UTF-8"?>\n<project version="4"><component name="MavenProjectsManager"><option name="originalFiles"><list>'+importXml+
    '</list></option></component><component name="ProjectRootManager" version="2" project-jdk-name="'+xml(sdk)+'" project-jdk-type="JavaSDK"/></project>\n';
  const rc='<?xml version="1.0" encoding="UTF-8"?>\n<component name="ProjectRunConfigurationManager"><configuration name="'+xml(name)+
    '" type="MavenRunConfiguration" factoryName="Maven"><MavenSettings><option name="myGeneralSettings"><MavenGeneralSettings>'+
    '<option name="mavenHome" value="'+xml(mh)+'"/><option name="userSettingsFile" value="'+xml(settings)+
    '"/></MavenGeneralSettings></option><option name="myRunnerSettings"><MavenRunnerSettings><option name="jreName" value="'+xml(sdk)+
    '"/><option name="skipTests" value="true"/><option name="vmOptions" value="'+xml(vm.map(quote).join(' '))+
    '"/></MavenRunnerSettings></option><option name="myRunnerParameters"><MavenRunnerParameters><option name="goals"><list><option value="tomcat7:run"/>'+
    '</list></option><option name="pomFileName" value="pom.xml"/><option name="workingDirPath" value="'+xml(module)+
    '"/><option name="resolveToWorkspace" value="true"/></MavenRunnerParameters></option></MavenSettings><method v="2"/></configuration></component>\n';
  await fs.mkdir(path.dirname(config),{recursive:true});
  if(!hasMisc)await fs.writeFile(misc,miscXml,{flag:'wx'});
  await fs.writeFile(config,rc,{flag:'wx'});
  return {ok:true,config,port,agentMode:mode,actualIdeaImport:'NOT_VERIFIED: open project and Reload Maven',
    sdkRegistration:'NOT_VERIFIED: '+sdk,existingMiscPreserved:hasMisc,
    importedPomCandidates:originalFiles,note:mode==='plugin'?'Use Run with JRebel; no manual agent injected':'Use ordinary Run; exactly one manual agent',
    remaining:'Verify SDK/Maven import, dependencies, rebel.xml mappings and readiness before claiming success'};
}
async function main(argv){
  const cmd=argv[0],o=flags(argv.slice(1));
  if(cmd==='inspect-log')return inspectLog(await fs.readFile(need(o,'file'),'utf8'));
  if(cmd==='redis-check')return redisCheck(readRedisSetting(await fs.readFile(need(o,'file'),'utf8')));
  if(cmd==='refresh-artifact')return refreshArtifact(o);
  if(cmd==='prepare-idea')return prepareIdea(o);
  throw Error('Commands: inspect-log, redis-check, refresh-artifact, prepare-idea. See references/helpers.md');
}
module.exports={inspectLog,readRedisSetting,redisCheck,refreshArtifact,prepareIdea,mavenCommand,freePort};
if(require.main===module)main(process.argv.slice(2)).then(r=>console.log(JSON.stringify(r,null,2))).catch(e=>{console.error(e.message);process.exitCode=1;});
