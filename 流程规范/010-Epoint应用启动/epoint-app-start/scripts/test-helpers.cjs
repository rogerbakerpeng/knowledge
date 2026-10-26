'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),net=require('node:net'),vm=require('node:vm');
const helper=require('./epoint-start.cjs');
(async()=>{
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'epoint-skill-test-'));
 const jdk=path.join(temp,'jdk'),maven=path.join(temp,'maven'),settings=path.join(temp,'settings.xml'),repo=path.join(temp,'repo');
 for(const d of [path.join(jdk,'bin'),path.join(maven,'boot'),path.join(maven,'bin')])await fs.mkdir(d,{recursive:true});
 for(const n of ['java','jar','javap'])await fs.writeFile(path.join(jdk,'bin',n+(process.platform==='win32'?'.exe':'')),'fixture');
 await fs.writeFile(path.join(maven,'boot','plexus-classworlds-test.jar'),'fixture');
 await fs.writeFile(path.join(maven,'bin','m2.conf'),'fixture');await fs.writeFile(settings,'<settings/>');
 const opts={'java-home':jdk,'maven-home':maven,settings,repo,group:'com.epoint.ztb',artifact:'ztb-bizlogic',version:'1.0.23',class:'com.epoint.ztb.bizlogic.UserPortraitCache$IPortraitLoader'};
 const jar=path.join(repo,'com','epoint','ztb','ztb-bizlogic','1.0.23','ztb-bizlogic-1.0.23.jar');
 await fs.mkdir(path.dirname(jar),{recursive:true});await fs.writeFile(jar,'original bytes');
 const plan=await helper.refreshArtifact({...opts,'dry-run':true});
 assert.equal(await fs.readFile(jar,'utf8'),'original bytes');
 assert.ok(plan.args.includes('-Dtransitive=false'));assert.ok(plan.args.includes('-Dartifact=com.epoint.ztb:ztb-bizlogic:1.0.23'));
 await assert.rejects(()=>helper.refreshArtifact({...opts,artifact:'../escape'}),/Invalid Maven coordinates/);
 // Failure path: run isolated module with an unavailable Maven process; real temporary filesystem.
 const code=await fs.readFile(path.join(__dirname,'epoint-start.cjs'),'utf8'),mod={exports:{}};
 function fakeRequire(name){if(name==='node:child_process')return {execFile:(...args)=>{const callback=args.at(-1);callback(Error('simulated download failure'));}};return require(name);}
 vm.runInNewContext(code,{require:fakeRequire,module:mod,exports:mod.exports,process,console,URL,Buffer,setTimeout,clearTimeout});
 await assert.rejects(()=>mod.exports.refreshArtifact(opts),/original restored=true/);
 assert.equal(await fs.readFile(jar,'utf8'),'original bytes');
 const before=helper.inspectLog('Started FrameEsfApplication in 10 seconds\nStarting ProtocolHandler ["http-bio-8081"]\nApplication run failed');
 assert.equal(before.fatalSignals.length,1);assert.match(before.readinessVerdict,/NOT_VERIFIED/);
 assert.equal(helper.readRedisSetting('#redisSetting=redis://wrong:6379/1\nredisSetting=redis://localhost:6379/6'),'redis://localhost:6379/6');
 assert.throws(()=>helper.readRedisSetting('redisSetting=ENC(secret)'),/MANUAL_CONFIG_REQUIRED/);
 let commands=[];
 const server=net.createServer(s=>s.on('data',b=>{const frame=b.toString();commands.push(frame);s.write(frame.includes('\r\nPING\r\n')?'+PONG\r\n':'+OK\r\n');}));
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port;
 try{
  const checked=await helper.redisCheck('redis://user:test-secret@127.0.0.1:'+port+'/6');
  assert.equal(checked.ping,'PONG');assert.equal(checked.authentication,'verified');assert.equal(checked.db,6);
  assert.ok(commands[0].includes('\r\nAUTH\r\n'));assert.ok(commands[1].includes('\r\nSELECT\r\n'));assert.ok(commands[2].includes('\r\nPING\r\n'));
  assert.ok(!JSON.stringify(checked).includes('test-secret'));
  const project=path.join(temp,'project');await fs.mkdir(path.join(project,'war'),{recursive:true});await fs.writeFile(path.join(project,'war','pom.xml'),'<project/>');
  const prepared=await helper.prepareIdea({'project':project,module:'war','java-home':jdk,'maven-home':maven,settings,'jdk-name':'fixture-sdk',port:String(port)});
  const config=await fs.readFile(prepared.config,'utf8');assert.notEqual(prepared.port,port);
  assert.ok(config.includes('value="pom.xml"'));assert.ok(config.includes('tomcat7:run'));assert.ok(!config.includes('-agentpath:'));assert.ok(!config.includes('pom-verify'));
  assert.match(prepared.actualIdeaImport,/NOT_VERIFIED/);
  const misc=path.join(project,'.idea','misc.xml');await fs.writeFile(misc,'existing user settings');
  const dll=path.join(temp,'jrebel64.dll');await fs.writeFile(dll,'fixture');
  const second=await helper.prepareIdea({'project':project,module:'war','java-home':jdk,'maven-home':maven,settings,'jdk-name':'fixture-sdk',port:String(prepared.port+1),'agent-mode':'standalone','jrebel-dll':dll});
  assert.equal(await fs.readFile(misc,'utf8'),'existing user settings');
  assert.equal((await fs.readFile(second.config,'utf8')).split('-agentpath:').length-1,1);
  await assert.rejects(()=>helper.prepareIdea({'project':project,module:'../outside','java-home':jdk,'maven-home':maven,settings,'jdk-name':'fixture-sdk'}),/Module must be inside/);
 }finally{await new Promise(r=>server.close(r));}
 console.log(JSON.stringify({ok:true,checks:['release refresh dry-run preserves original','invalid coordinates rejected','Maven failure restores original JAR','fatal logs never become readiness verdict','Redis AUTH/SELECT/PING and credential redaction','occupied port selects alternative','plugin mode has no duplicate agent','standalone mode injects exactly one agent','existing IDEA settings preserved','module escape rejected'],temporaryFixtures:temp},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
