(() => {
  'use strict';
  const stages=window.TRAIL.stages,byId=new Map(stages.map(s=>[s.id,s]));
  const model=window.TRAIL_STATE,engine=window.PROMPT_ENGINE,$=s=>document.querySelector(s);
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const suffix=location.pathname.replace(/index\.html$/,''),key='research-trail:projects:v1:'+suffix,legacyKey='research-trail:v1:'+suffix;
  let library=model.blankLibrary(),baseline=null,writeBlocked=false,rawRecovery='',loadMessage='',activeId=null,state=null,selected='1',query='',pendingTransfer=null,pendingImport=null,importTicket=0,toastTimer;
  try{
    const raw=localStorage.getItem(key);baseline=raw;
    if(raw!==null){rawRecovery=raw;library=model.validateLibrary(JSON.parse(raw));}
    else {const old=localStorage.getItem(legacyKey);if(old){rawRecovery=old;library=model.appendImports(library,model.importData(JSON.parse(old)));if(library.projects[0]&&!library.projects[0].data.project)library.projects[0].data.project='之前的研究';const migrated=JSON.stringify(library);localStorage.setItem(key,migrated);baseline=migrated;loadMessage='之前的研究已保留为一个独立项目，点击“继续项目”即可打开。';}}
  }catch(error){writeBlocked=true;loadMessage='本地记录暂时无法读取或保存，原数据未删除。本页可临时使用，请通过“备份”导出内容。';}
  function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3600);}
  function warn(text){$('#storage-alert').innerHTML='<div class="notice">'+esc(text)+'</div>';$('#save-state').textContent='有内容未自动保存，请导出备份';}
  function persist(){
    if(writeBlocked){warn('自动保存已暂停。请导出本页项目以保留改动，再刷新检查本地记录。');return false;}
    try{const current=localStorage.getItem(key);if(current!==baseline){writeBlocked=true;warn('其他页面已更新项目。为避免覆盖，本页暂停自动保存；请先导出本页内容，再刷新。');return false;}const next=JSON.stringify(library);localStorage.setItem(key,next);baseline=next;$('#save-state').textContent='已自动保存到当前浏览器';return true;}
    catch{warn('浏览器未能保存，可能存储已满或被限制。内容仍在本页，请导出备份后再离开。');return false;}
  }
  function save(){const entry=library.projects.find(p=>p.id===activeId);if(entry&&state){entry.data=state;entry.updatedAt=new Date().toISOString();}return persist();}
  function open(title,html){pendingTransfer=null;pendingImport=null;importTicket++;$('#modal-title').textContent=title;$('#modal-body').innerHTML=html;if(!$('#modal').open)$('#modal').showModal();}
  function close(){$('#modal').close();pendingTransfer=null;pendingImport=null;importTicket++;}
  function focusMain(){window.scrollTo(0,0);$('#main').focus({preventScroll:true});}
  function home(){close();activeId=null;state=null;query='';renderHome();focusMain();}
  function projectName(p){return p.data.project||'未命名项目';}
  function renderHome(){
    const list=[...library.projects].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
    $('#main').innerHTML=`<div class="home"><section class="hero"><div><p class="eyebrow">RESEARCH TRAIL</p><h1>你的研究项目</h1></div><button class="primary" data-action="new">＋ 新建项目</button></section>${loadMessage?'<div class="notice">'+esc(loadMessage)+'</div>':''}${list.length?`<div class="project-grid">${list.map(p=>`<article class="project-card"><h2>${esc(projectName(p))}</h2><p class="project-step">Stage ${esc(p.data.current)} · ${esc(byId.get(p.data.current).title)}</p><p class="project-meta">更新于 ${esc(new Date(p.updatedAt).toLocaleString('zh-CN'))}</p><div class="card-actions"><button class="resume" data-project="${esc(p.id)}" aria-label="继续项目 · ${esc(projectName(p))}">继续项目 →</button><button class="quiet delete" data-delete="${esc(p.id)}" aria-label="删除项目 · ${esc(projectName(p))}">删除</button></div></article>`).join('')}</div>`:'<section class="empty-state"><h2>从一个研究想法开始</h2><p class="muted">新建项目后，只看当前这一步。</p></section>'}</div>`;
  }
  function requestDelete(id){
    const p=library.projects.find(p=>p.id===id);if(!p)return;
    open('删除项目“'+projectName(p)+'”？',`<p>此操作会删除当前浏览器中该项目保存的进度、笔记和相关本地记录。此操作不可撤销。</p><div class="button-row"><button data-action="close" autofocus>取消</button><button class="danger" data-delete-confirm="${esc(id)}">确认删除</button></div>`);
  }
  function deleteProject(id){
    if(!library.projects.some(p=>p.id===id))return;
    const previous=library;library={...library,projects:library.projects.filter(p=>p.id!==id)};
    if(!persist()){library=previous;toast('删除未保存，项目仍保留。请先备份，再处理保存问题。');return;}
    home();toast('项目已从当前浏览器删除。');
  }
  function newProject(){open('新建项目',`<form id="new-project-form"><div class="form-field"><label for="new-project-name">项目名称</label><input id="new-project-name" maxlength="100" autocomplete="off" placeholder="例如：城市热岛研究"></div><details class="fold"><summary>已有研究进展？选择起点（可选）</summary><label for="start-stage">从哪里开始</label><select id="start-stage"><option value="1">新想法 · 先明确科学问题</option><option value="5">已有问题 · 设计研究</option><option value="9">已有结果 · 解释结果</option><option value="12">已有初稿 · 整理与修改</option><option value="19">收到真实审稿意见 · 返修</option></select></details><p class="small muted" style="margin-top:18px">这是一个空白项目。已有研究会原样保留。</p><button type="submit" class="primary wide">创建并开始</button></form>`);$('#new-project-name').focus();}
  function enter(id){const project=library.projects.find(p=>p.id===id);if(!project)return;activeId=id;state=project.data;selected=state.current;query='';close();renderStep();focusMain();}
  function go(id,arrival=null){if(!state||!byId.has(id))return;if(id!==selected||arrival){state.arrival=arrival;state.repair=null;}selected=id;state.current=id;save();close();renderStep();focusMain();}
  function navHTML(){return window.TRAIL.groups.map((g,i)=>{const items=stages.filter(s=>s.group===i&&(!query||[s.id,s.title,s.en,s.skill].join(' ').toLowerCase().includes(query)));return items.length?`<details class="nav-group" ${(i===byId.get(selected).group||query)?'open':''}><summary>${esc(g)}</summary>${items.map(s=>`<button class="stage-link" data-go="${s.id}" ${s.id===selected?'aria-current="step"':''}><span class="stage-num">${state.completed.includes(s.id)?'✓':s.id}</span><span>${esc(s.title)}</span></button>`).join('')}</details>`:'';}).join('')||'<p class="small muted">没有匹配步骤。</p>';}
  function basePrompt(s){return engine.execution(s,state.arrival);}
  function composed(s,zh=false){const base=zh?engine.translation(s,state.arrival):basePrompt(s),context=state.simpleContext[s.id]?.trim();return (base||basePrompt(s))+(context?'\n\n我补充的情况（与此前信息冲突时请先核对）：\n'+context:'');}
  function prompt(s){return Object.hasOwn(state.simpleDrafts,s.id)?state.simpleDrafts[s.id]:composed(s);}
  function renderStep(){
    const s=byId.get(selected),arrived=state.arrival?.to===s.id&&state.arrival.kind==='handoff';
    const needsHandoff=s.handoffFrom&&!arrived;
    const action=arrived?'<p class="handoff-ready">已用交接内容开始本步</p><p class="muted">在 '+s.platform+' 继续执行刚才发出的完整任务，无需再复制本步 Prompt。</p>':needsHandoff?'<p>本步需要前序 Chat 的真实结论。若已把生成任务发给 Codex，可直接确认开始。</p><button class="primary" data-action="prepare-entry">准备 Chat → Codex 交接</button><button class="quiet" data-action="already-sent">已发出完整任务，开始本步</button>':'<p class="muted">在本项目的 '+s.platform+' 中继续。</p><button class="primary" data-action="copy-prompt">复制当前 Prompt</button>';
    $('#main').innerHTML=`<div class="workspace"><section class="step-content"><div class="project-line"><button class="quiet" data-action="home">← 项目首页</button><span>${esc(state.project||'未命名项目')}</span></div><p class="eyebrow">STAGE ${s.id} · ${esc(window.TRAIL.groups[s.group])}</p><h1>${esc(s.title)}</h1><span class="pill ${s.platform==='Codex'?'codex':''}">${s.platform}</span><p class="step-goal">${esc(s.meaning)}</p><section class="action-card">${action}</section><div class="next-row"><button class="next-button" data-action="next">完成本步，查看下一步 →</button></div>${s.next&&byId.get(s.next).platform!==s.platform?'<p class="route-hint">继续时需要 '+s.platform+' → '+byId.get(s.next).platform+' 交接</p>':''}<details class="more fold"><summary>更多</summary><div class="button-row"><button data-action="rename">重命名项目</button><button data-action="backup">备份与恢复</button><button data-action="help">使用说明</button><button class="quiet delete" data-delete="${esc(activeId)}">删除此项目</button></div><details class="fold"><summary>浏览全部步骤</summary><input id="search" aria-label="搜索步骤" placeholder="搜索步骤…" value="${esc(query)}"><nav id="stage-nav" aria-label="科研步骤">${navHTML()}</nav></details><details class="fold"><summary>补充本次情况（可选）</summary><label for="stage-context">想补充什么？</label><textarea id="stage-context" class="context-editor" placeholder="也可以直接在实际对话中说明。">${esc(state.simpleContext[selected]||'')}</textarea><p id="context-hint" class="small muted"></p></details><details class="fold" id="prompt-details"><summary>查看 / 编辑本步任务</summary>${arrived||needsHandoff?'<p class="small muted">这是本步科学任务的参考文本。已使用完整交接时不需再次发送；此模板不能代替实际交接中的科学结论。</p>':''}<label for="prompt-editor">当前执行文本</label><textarea id="prompt-editor" class="prompt-editor" spellcheck="false">${esc(prompt(s))}</textarea><div class="button-row"><button data-action="copy-prompt">复制本步任务</button>${engine.translation(s)?'<button data-action="translation">查看中文翻译</button>':''}<button class="quiet" data-action="rebuild">恢复当前模板</button></div></details>${engine.translation(s)?'<div class="button-row"><button data-action="translation">查看中文翻译</button></div>':''}<details class="fold"><summary>笔记（可选）</summary><label for="stage-notes">随手记</label><textarea id="stage-notes" class="note-editor">${esc(state.notes[selected]||'')}</textarea></details><details class="fold"><summary>本步范围与工具</summary><p>${esc(s.continuity)}</p><p class="small"><b>工具：</b>${esc(s.skill)}</p><ul>${s.tasks.map(t=>'<li>'+esc(t)+'</li>').join('')}</ul><p class="small muted">${esc(s.boundary)}</p></details><details class="fold"><summary>完成情况与个人记录</summary><p class="small muted">进度记录不等于作者批准，不必勾选才能继续。已记录 ${state.completed.length} 步。</p><div class="button-row"><button data-action="complete">${state.completed.includes(selected)?'撤销完成标记':'标记完成'}</button><button data-action="navigator">复制本步完成检查请求</button><button data-action="old-records">查看升级前个人记录</button></div></details></details></section></div>`;
  }
  async function copy(text,element){if(!text?.trim()){toast('还没有可复制的内容。');return;}try{await navigator.clipboard.writeText(text);toast('已复制，粘贴到对应对话即可。');}catch{if(element){let fold=element.closest('details');while(fold){fold.open=true;fold=fold.parentElement?.closest('details');}element.focus();element.select();try{if(document.execCommand('copy')){toast('已复制。');return;}}catch{}}toast('请手动选择文本并按 Ctrl+C。');}}
  function textDialog(title,text,label='复制这段话',intro=''){open(title,`${intro?'<p>'+esc(intro)+'</p>':''}<label for="utility-text">${esc(title)}</label><textarea id="utility-text" class="modal-prompt" readonly>${esc(text)}</textarea><div class="button-row"><button class="primary" data-action="copy-modal">${esc(label)}</button></div>`);}
  function transfer(target,source=byId.get(selected)){
    const chatToCodex=source.platform==='Chat',text=chatToCodex?engine.fixedA(source,target):engine.fixedB(source,target);
    open(source.platform+' → '+target.platform+' · Stage '+target.id,`<p><b>1.</b> 把下面的交接请求发到当前 ${source.platform}。</p><p><b>2.</b> 将它生成的完整内容一次复制到 ${target.platform}，直接开始「${esc(target.title)}」。</p><p class="small muted">${chatToCodex?'输出标题为 FINAL CODEX EXECUTION PROMPT。':'输出含 HANDOFF TO CHAT 与 NEXT CHAT TASK。'}目标平台无需再接收第二份阶段 Prompt。</p><button class="primary" data-action="copy-modal">复制交接请求给 ${source.platform}</button><details class="fold"><summary>查看交接请求</summary><label for="utility-text">交接请求</label><textarea id="utility-text" class="modal-prompt" readonly>${esc(text)}</textarea></details><div class="button-row"><button data-action="transfer-done">已将生成内容发到 ${target.platform}，进入本步</button><button class="quiet" data-action="close">稍后再做</button></div>`);
    pendingTransfer={from:source.id,to:target.id,kind:'handoff',mode:'normal'};
  }
  function route(id){
    const target=byId.get(id),s=byId.get(selected);if(!target)return;
    if(s.platform!==target.platform){transfer(target);return;}
    const isFix=s.fixTo===id,arrival={from:s.id,to:id,kind:'direct',mode:isFix?'fix':'normal'};
    go(id,arrival);if(isFix){state.repair={audit:s.id,stage:id};save();}
  }
  const choice=(id,title,desc='')=>`<button data-route="${id}"><b>${esc(title)}</b>${desc?'<small>'+esc(desc)+'</small>':''}</button>`;
  function next(){
    const s=byId.get(selected);if(state.repair?.stage===selected){const audit=state.repair.audit;go(audit,{from:s.id,to:audit,kind:'direct',mode:'recheck'});return;}if(!s.gate&&s.next){route(s.next);return;}
    let body='<p>按实际结果选择。仍有阻断或待作者裁决时，请留在本步或选择相应问题分支。</p><div class="decision-list">';
    if(s.gate==='novelty')body+=choice('5','继续研究','问题和创新性已经确认。')+choice('2','问题改了，需要再查创新性')+'<button data-status="paused">先暂停这个项目</button>';
    else if(s.gate==='architecture')body+=choice('12D','结构通过，但还没有初稿')+choice('12','结构通过，已经有初稿')+choice('10','结构有科学问题，回 Chat 判断');
    else if(s.gate==='results')body+=choice('9','结果核验通过，回 Chat 解释')+choice('7','发现实现错误，先修代码')+choice('5','设计有问题，回 Chat 判断');
    else if(s.gate==='submission')body+='<button data-status="waiting">已投稿，先等待真实审稿意见</button>'+choice('19','收到真实审稿意见，开始返修')+choice('23A','先整理可复现材料');
    else if(s.gate==='coach')body+=choice('21A','策略已确认，需要批准的新计算')+choice('21B','策略已确认，不需要新计算')+choice('19','还有科学争议，先回 Chat');
    else if(s.gate){body+=choice(s.next,'检查通过，继续下一步');if(s.fixTo)body+=choice(s.fixTo,'有明确的文件问题，先修正');if(s.returnTo)body+=choice(s.returnTo,'需要科学判断，回 Chat 讨论');}
    else body+='<button data-status="finished">记录本轮结束</button>'+choice('19','又收到真实审稿意见');
    open('接下来怎么走',body+'</div><div class="button-row"><button class="quiet" data-action="close">尚未完成，留在本步</button></div>');
  }
  function help(){open('做当前这一步',`<ol><li>选择或新建项目，复制当前任务到本项目的 Chat / Codex。</li><li>实际完成后，点击“完成本步，查看下一步”，按核实结果选择分支。</li><li>同平台直接继续；换平台时，发出一次交接请求，将生成的完整内容发到目标平台，直接启动任务。无需再复制目标阶段 Prompt。</li></ol><p>网页负责流程，模型只完成当前科研任务。项目记录留在当前浏览器；网页不读取模型对话、不判断实际科研是否完成。换平台确需图表/稿件时，仍须让目标平台实际取得材料。</p><p>更多中可以查看英文任务的中文对照、记笔记、浏览其他步骤、重命名、备份和删除项目。自定义文本不会自动翻译。导入先预览，确认后新增项目，不覆盖已有记录。</p>`);}

  function download(name,data,type='application/json'){const blob=new Blob([typeof data==='string'?data:JSON.stringify(data,null,2)],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
  function backup(){open('项目与备份',`<p>所有项目都保存在当前浏览器；不会上传 GitHub，也不会自动跨设备同步。</p><div class="button-row"><button class="primary" data-action="export-all">导出全部项目</button>${state?'<button data-action="export-current">导出当前项目</button>':''}</div><label class="file-label">导入备份（新增为项目）<input id="import-file" type="file" accept=".json,application/json"></label><p class="small muted">支持以前版本的单项目备份。导入前先预览；确认后新增项目，已有内容不会被覆盖。</p><div id="import-preview"></div>${state?'<details class="fold"><summary>升级前的个人记录</summary><p class="small">旧填写内容、成果资料和自定义文本仍保留，只是不再要求你维护它们。</p><button data-action="old-records">查看个人记录</button></details>':''}${rawRecovery&&writeBlocked?'<button data-action="export-raw">下载原始本地记录</button>':''}`);}
  function records(){const entries=model.history(state);for(const [stageId,text] of Object.entries(state.packages))if(text)entries.push({stageId,kind:'之前保存的研究资料',text});for(const [stageId,fields] of Object.entries(state.fields))if(fields.some(Boolean))entries.push({stageId,kind:'之前填写的信息',text:fields.filter(Boolean).join('\n\n')});open('当前项目的个人记录',`<pre class="history-text">${esc(entries.length?entries.map(x=>'步骤 '+x.stageId+' · '+x.kind+'\n'+x.text).join('\n\n────────\n\n'):'暂无升级前的个人记录。')}</pre><button data-action="export-current">导出当前项目完整备份</button>`);}
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b||b.disabled)return;
    if(b.dataset.delete){requestDelete(b.dataset.delete);return;}if(b.dataset.deleteConfirm){deleteProject(b.dataset.deleteConfirm);return;}
    if(b.dataset.project){enter(b.dataset.project);return;}if(b.dataset.go){go(b.dataset.go);return;}if(b.dataset.route){route(b.dataset.route);return;}
    if(b.dataset.status&&state){state.status=b.dataset.status;save();close();toast('已记录项目状态，内容会保留。');return;}
    const s=state?byId.get(selected):null;
    switch(b.dataset.action){
      case 'home':home();break;case 'new':newProject();break;case 'close':close();break;case 'help':help();break;case 'backup':backup();break;
      case 'rename':if(state){open('重命名项目',`<form id="rename-form"><label for="rename-name">项目名称</label><input id="rename-name" maxlength="100" value="${esc(state.project)}"><div class="button-row"><button class="primary" type="submit">保存名称</button></div></form>`);}break;
      case 'copy-prompt':copy($('#prompt-editor').value,$('#prompt-editor'));break;
      case 'translation':textDialog('中文阅读对照',composed(s,true),'复制中文对照','对应当前内置模板，不覆盖执行文本；手动改写不会自动翻译，补充情况保留原值。');break;
      case 'copy-modal':copy($('#utility-text').value,$('#utility-text'));break;
      case 'navigator':textDialog('只检查本步是否完成',engine.completion(s));break;
      case 'complete':state.completed=state.completed.includes(selected)?state.completed.filter(id=>id!==selected):[...state.completed,selected];save();renderStep();break;
      case 'next':next();break;
      case 'prepare-entry':transfer(s,byId.get(s.handoffFrom));break;
      case 'already-sent':go(s.id,{from:s.handoffFrom,to:s.id,kind:'handoff',mode:'normal'});break;
      case 'transfer-done':if(pendingTransfer){const arrival=pendingTransfer;go(arrival.to,arrival);}break;
      case 'rebuild':open('恢复当前模板','<p>会替换你在本步完整文本中的手动修改，补充情况和笔记保留。</p><button class="primary" data-action="rebuild-confirm">确认恢复模板</button>');break;
      case 'rebuild-confirm':delete state.simpleDrafts[selected];save();close();renderStep();break;
      case 'export-all':download('research-trail-all-projects.json',library);break;
      case 'export-current':if(state)download('research-trail-project.json',{format:'research-trail-project',version:1,data:state});break;
      case 'export-raw':download('research-trail-original-record.json',rawRecovery);break;
      case 'old-records':records();break;
      case 'import-confirm':if(pendingImport){library=model.appendImports(library,pendingImport);const count=pendingImport.length,ok=persist();close();home();toast(ok?'已新增 '+count+' 个项目，原项目保留。':'已载入项目，但尚未自动保存，请导出全部项目。');}break;
    }
  });
  document.addEventListener('submit',e=>{
    if(e.target.id==='new-project-form'){e.preventDefault();const name=$('#new-project-name').value.trim()||'未命名项目 '+(library.projects.length+1);const project=model.createProject(name,$('#start-stage').value);library.projects.push(project);const ok=persist();enter(project.id);toast(ok?'新项目已创建，内容从空白开始。':'新项目已创建，但尚未自动保存，请导出备份。');}
    if(e.target.id==='rename-form'){e.preventDefault();state.project=$('#rename-name').value.trim()||'未命名项目';save();close();renderStep();}
  });
  document.addEventListener('input',e=>{
    const el=e.target;if(el.id==='search'){query=el.value.trim().toLowerCase();$('#stage-nav').innerHTML=navHTML();return;}if(!state)return;
    if(el.id==='stage-context'){state.simpleContext[selected]=el.value;if(!Object.hasOwn(state.simpleDrafts,selected))$('#prompt-editor').value=composed(byId.get(selected));else $('#context-hint').textContent='完整文本有手动编辑。如需合并新补充，可先保存改写内容，再恢复模板。';}
    else if(el.id==='prompt-editor')state.simpleDrafts[selected]=el.value;
    else if(el.id==='stage-notes')state.notes[selected]=el.value;
    else return;save();
  });
  document.addEventListener('change',async e=>{
    if(e.target.id!=='import-file')return;pendingImport=null;const ticket=++importTicket,preview=$('#import-preview');preview.textContent='正在读取备份…';
    try{const file=e.target.files[0];if(!file){preview.textContent='';return;}if(file.size>25*1024*1024)throw Error('备份超过 25 MB');const entries=model.importData(JSON.parse(await file.text()));if(ticket!==importTicket||!preview.isConnected)return;if(!entries.length)throw Error('备份中没有项目');pendingImport=entries;preview.innerHTML=`<div class="notice">将新增 ${entries.length} 个项目：${entries.map(p=>esc(p.project||'未命名项目')).join('、')}。已有项目不覆盖。</div><button class="primary" data-action="import-confirm">确认新增这些项目</button>`;}
    catch(error){if(ticket!==importTicket)return;pendingImport=null;if(preview.isConnected)preview.textContent='无法导入：'+error.message+'。已有项目未改变。';}
  });
  $('#modal').addEventListener('close',()=>{pendingImport=null;});
  window.addEventListener('storage',e=>{if(e.key===key&&e.newValue!==baseline){writeBlocked=true;warn('其他页面更新了项目。请先导出本页未保存内容，再刷新；本页不会覆盖其他页面的修改。');}});
  renderHome();if(writeBlocked)warn(loadMessage);
})();
