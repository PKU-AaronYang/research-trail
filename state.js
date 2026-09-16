/* 多项目数据独立保存；迁移不删除旧数据，不把旧完整模板自动带入轻量执行区。 */
(() => {
  'use strict';
  const ids=new Set(window.TRAIL.stages.map(s=>s.id));
  const record=x=>x&&typeof x==='object'&&!Array.isArray(x);
  const strings=x=>record(x)&&Object.values(x).every(v=>typeof v==='string');
  const arrays=(x,type)=>record(x)&&Object.values(x).every(a=>Array.isArray(a)&&a.every(v=>typeof v===type));
  const stageList=x=>Array.isArray(x)&&x.every(v=>ids.has(v));
  const clone=x=>JSON.parse(JSON.stringify(x));
  const blank=()=>({version:5,workflowVersion:'4.0',project:'',current:'1',completed:[],checks:{},notes:{},fields:{},drafts:{},generated:{},packages:{},personalHistory:[],reviewNeeded:[],status:'active',simpleContext:{},simpleDrafts:{},simpleGenerated:{},arrival:null,repair:null});
  function validate(v){
    if(!record(v)||![1,2,3,4,5].includes(v.version)||typeof v.project!=='string'||!ids.has(v.current)||!stageList(v.completed)||!['active','paused','waiting','finished'].includes(v.status))throw Error('项目格式或版本不匹配');
    for(const k of ['notes','drafts','generated'])if(!strings(v[k]))throw Error('项目文本格式不正确：'+k);
    if(!arrays(v.checks,'boolean')||!arrays(v.fields,'string'))throw Error('项目填写记录格式不正确');
    const out={...blank()};
    for(const k of ['project','current','completed','checks','notes','fields','drafts','generated','status'])out[k]=clone(v[k]);
    out.completed=[...new Set(out.completed)];
    if(v.version>=2){if(!strings(v.packages)||!stageList(v.reviewNeeded))throw Error('历史成果记录格式不正确');out.packages=clone(v.packages);out.reviewNeeded=clone(v.reviewNeeded);}
    if(v.version===2){
      for(const k of ['legacyDrafts','legacyGenerated']){if(!strings(v[k]))throw Error('个人历史文本格式不正确');for(const [stageId,text] of Object.entries(v[k]))out.personalHistory.push({stageId,kind:k==='legacyDrafts'?'个人编辑':'对话生成任务',sourceVersion:'1',text});}
    }
    if(v.version>=3){
      if(!Array.isArray(v.personalHistory)||!v.personalHistory.every(x=>record(x)&&['stageId','kind','sourceVersion','text'].every(k=>typeof x[k]==='string')))throw Error('个人历史记录格式不正确');
      out.personalHistory=clone(v.personalHistory);
    }
    if(v.version>=4){
      if(v.workflowVersion!==(v.version===4?'3.0':'4.0'))throw Error('不支持的流程版本');
      for(const k of ['simpleContext','simpleDrafts','simpleGenerated']){if(!strings(v[k]))throw Error('项目内容格式不正确：'+k);out[k]=clone(v[k]);}
      if(v.version===4){
        for(const [stageId,text] of Object.entries(out.simpleDrafts))out.personalHistory.push({stageId,text,kind:'v3 个人执行文本',sourceVersion:'3.0'});
        for(const [stageId,text] of Object.entries(out.simpleGenerated))out.personalHistory.push({stageId,text,kind:'v3 对话生成任务',sourceVersion:'3.0'});
        out.simpleDrafts={};out.simpleGenerated={};
      }
    }
    if(v.version===5){
      if(v.arrival!==null){const a=v.arrival;if(!record(a)||!ids.has(a.from)||!ids.has(a.to)||!['direct','handoff'].includes(a.kind)||!['normal','fix','recheck'].includes(a.mode))throw Error('步骤衔接记录格式不正确');out.arrival={from:a.from,to:a.to,kind:a.kind,mode:a.mode};}
      if(v.repair!==null){const r=v.repair;if(!record(r)||!ids.has(r.audit)||!ids.has(r.stage)||window.TRAIL.stages.find(s=>s.id===r.audit).fixTo!==r.stage)throw Error('复查记录格式不正确');out.repair={audit:r.audit,stage:r.stage};}
    }
    return out;
  }
  const blankLibrary=()=>({format:'research-trail-projects',version:1,projects:[]});
  function validateLibrary(v){
    if(!record(v)||v.format!=='research-trail-projects'||v.version!==1||!Array.isArray(v.projects))throw Error('项目库格式不正确');
    const seen=new Set(),projects=v.projects.map(p=>{
      if(!record(p)||typeof p.id!=='string'||!p.id||seen.has(p.id)||typeof p.createdAt!=='string'||typeof p.updatedAt!=='string')throw Error('项目标识或日期格式不正确');
      seen.add(p.id);return {id:p.id,createdAt:p.createdAt,updatedAt:p.updatedAt,data:validate(p.data)};
    });return {format:'research-trail-projects',version:1,projects};
  }
  let sequence=0;
  function id(){return typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():'project-'+Date.now().toString(36)+'-'+(++sequence)+'-'+Math.random().toString(36).slice(2);}
  function entry(data){const date=new Date().toISOString();return {id:id(),createdAt:date,updatedAt:date,data:validate(data)};}
  function createProject(name,current='1'){const data=blank();data.project=(name||'未命名项目').trim().slice(0,100)||'未命名项目';if(!ids.has(current))throw Error('起始步骤无效');data.current=current;return entry(data);}
  function importData(v){
    if(record(v)&&v.format==='research-trail-projects')return validateLibrary(v).projects.map(p=>p.data);
    if(record(v)&&v.format==='research-trail-project'){if(v.version!==1)throw Error('单项目备份版本不支持');return [validate(v.data)];}
    return [validate(v)];
  }
  function appendImports(library,data){const next=validateLibrary(library);for(const raw of data){const p=entry(raw),base=p.data.project||'导入的项目';let name=base,n=1;while(next.projects.some(x=>x.data.project===name))name=base+'（导入 '+n+++'）';p.data.project=name;next.projects.push(p);}return next;}
  function history(data){return [...data.personalHistory,...Object.entries(data.drafts).map(([stageId,text])=>({stageId,text,kind:'升级前个人编辑',sourceVersion:'旧记录'})),...Object.entries(data.generated).map(([stageId,text])=>({stageId,text,kind:'升级前生成任务',sourceVersion:'旧记录'}))];}
  window.TRAIL_STATE={blank,validate,blankLibrary,validateLibrary,createProject,entry,importData,appendImports,history};
})();
