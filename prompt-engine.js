/* Workflow destinations are chosen by the website, never inferred by a model. */
(() => {
  'use strict';
  const byId=id=>window.TRAIL.stages.find(s=>s.id===id);
  function execution(s,arrival=null,zh=false){
    const base=(zh&&window.PROMPT_TRANSLATIONS[s.id])||window.PROMPTS[s.id]||'';
    if(!arrival||arrival.to!==s.id)return base;
    const from=byId(arrival.from);
    let context=`本次实际承接：Stage ${from.id} ${from.title}。使用其真实结论、待处理问题和相关文件。`;
    if(arrival.kind==='handoff')context+=' 本步若已由完整交接启动，继续那份任务，勿重复启动。';
    if(arrival.mode==='fix')context+='\n本次是局部纠错：以下任务范围仅适用于上一检查已经定位的实现/文件问题及受影响输出。不要重做本阶段全部工作，不扩大分析、重写全文或改变科学决定；修正后核验受影响结果，保留实际修改记录。需要科学裁决则停止。';
    if(arrival.mode==='recheck')context+='\n本次是修正后的定向复查：只复查原未解决问题、此次改动及其直接影响，不无故重开已通过的范围。';
    return context+'\n\n'+base;
  }
  function fixedA(source,target){return `我们已经在当前 Chat 完成 Stage ${source.id}：${source.title} 的讨论。
网页指定目标为 Stage ${target.id}：${target.title}。不要另选阶段。
请依据真实讨论与作者实际决定，直接生成一份完整、可执行的中文任务，标题必须是：
# FINAL CODEX EXECUTION PROMPT

这份输出由我原样复制到 Codex，Codex 收到后直接执行本步，不再生成另一份计划或 Prompt。
请写明：
CURRENT STAGE / TARGET STAGE：Stage ${target.id} — ${target.title}
SCIENTIFIC CONTEXT：已确认问题、hypotheses、已有关键证据与未决事项。
AUTHOR APPROVED DECISIONS：实际批准范围及锁定决定；区分建议、草案与批准。
DESIGN：本任务需要的样本、时空尺度、变量/指标、阈值、方法；不适用项可略，未知不得补造。
INPUTS / FILES TO READ：真实已知文件位置与用途；要求 Codex 自行检查工作区，不让作者重建文件表。Chat 没有读到的文件明确标注；真正缺失的关键材料在执行前核对。
TASKS / DO NOT / STOP CONDITIONS / EXPECTED OUTPUT：落实下方目标任务与边界，保留其简短 STAGE RESULT 结尾。

必须把本步必要科学上下文写入正文，不能用“见之前聊天”代替，因为 Codex 看不到这里。
如果仍缺必要的作者科学决定，先提出最少必要问题，状态写 AUTHOR DECISION REQUIRED，暂不把草案包装成最终执行指令。不编造数值、路径或批准。
只输出这一份最终执行任务，不在末尾要求 Codex 再生成后续 Prompt。

目标任务（在下述范围内嵌入真实上下文）：
${execution(target)}`;}
  function fixedB(source,target){return `Stage ${source.id}：${source.title} 的当前 Codex 工作需要交回 Chat。
不要开始目标阶段。只基于已完成的真实工作生成一份中文交接，标题必须为：
# HANDOFF TO CHAT — STAGE ${target.id}

简洁包含：实际完成与未完成工作；核验发现和关键数值（含必要样本量、单位、不确定性）；不能推断的更强结论；未解决不确定性；实际文件位置和版本；实现问题与设计问题的区别；需作者裁决的事项。必要的结果/意见应直接带入文本，不能只有本地路径，Chat 不能凭路径读取 Codex 文件。确需看原图/原稿时指出最少需附带的内容，不能冒充 Chat 已取得文件。
保留真实作者批准与待决定事项的区别。不复制执行日志，不虚构完成情况。

在同一输出末尾完整加入下面的 NEXT CHAT TASK；我把这份输出一次复制回 Chat 后，它应立即进行这个科学任务，不再让我复制另一份阶段 Prompt，不再生成交接摘要：

# NEXT CHAT TASK
你已收到 Stage ${source.id} 的交接。请立即使用上面的核实内容，结合本 Chat 已有项目背景，执行以下任务：
${execution(target)}

若因科学问题返回，优先解决交接中明确的问题，保留未受影响的已确认决定。`;}
  function completion(s){return `请仅检查当前 Stage ${s.id}（${s.title}）是否已完成。根据真实工作说明已完成范围、阻断和仍需作者裁决的事项；只用 STAGE RESULT / Status / Confirmed / Evidence / outputs / Unresolved / Author decisions 作简短总结。不要选择后续阶段或平台，不开始其他任务。`;}
  window.PROMPT_ENGINE={execution,translation:(s,arrival)=>window.PROMPT_TRANSLATIONS[s.id]?execution(s,arrival,true):null,fixedA,fixedB,completion};
})();
