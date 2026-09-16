window.TRAIL = {
  "version": "4.0",
  "title": "Research Trail v4.0 · 做当前这一步",
  "groups": [
    "选题与创新性",
    "设计与计算",
    "证据与初稿",
    "审稿与投稿定稿",
    "真实返修",
    "复现与归档"
  ],
  "stages": [
    {
      "id": "0",
      "group": 0,
      "title": "梳理已有研究材料（可选）",
      "en": "Project intake",
      "platform": "Chat",
      "skill": "项目材料梳理",
      "meaning": "我们已经有什么，哪些信息还需要作者提供？",
      "tasks": [
        "记录实际研究对象、文件版本、数据可用性和入口阶段。",
        "区分作者已提供、尚未提供与不适用材料。",
        "形成可带到后续阶段的项目背景清单。"
      ],
      "boundary": "不猜测作者数据、期刊、文件或批准记录。期刊可先待定，但 Stage 10 前需明确目标或暂定格式。",
      "next": "1",
      "continuity": "使用作者实际提供的现状；本步是可选的材料梳理，不要求建立阶段交付表。",
      "previous": null
    },
    {
      "id": "1",
      "group": 0,
      "title": "把想法变成科学问题",
      "en": "Scientific scoping",
      "platform": "Chat",
      "skill": "科学讨论",
      "meaning": "我的想法到底是不是一个科学问题？",
      "tasks": [
        "用反例挑战研究假设，区分现象和科学问题。",
        "列出竞争性解释，以及能够区分它们的证据。",
        "明确什么结果会削弱或推翻假设。",
        "明确候选贡献，标注仍待创新性检验。"
      ],
      "boundary": "不写论文，不堆方法，不默认创新性成立。",
      "next": "2",
      "continuity": "从作者的研究想法开始；若已完成 Stage 0，使用其中已提供的背景与限制。尚未提出想法时只先问研究构想。",
      "previous": "0"
    },
    {
      "id": "2",
      "group": 0,
      "title": "第一轮创新性广搜",
      "en": "Novelty broad scan",
      "platform": "Chat",
      "skill": "联网检索与科学讨论",
      "meaning": "别人已经做到哪里？我的创新是否真实？",
      "tasks": [
        "跨术语、跨相邻领域寻找最强先例。",
        "找出假缺口、重复工作以及可能削弱创新性的最新研究。",
        "给出 Strong / Moderate / Weak / Not defensible 判断及证据。"
      ],
      "boundary": "检索目标是攻击风险，不是替项目证明创新性。",
      "next": "3",
      "continuity": "承接 Stage 1 的科学问题、假设和候选贡献；若由 Stage 4 返回，使用作者最新确认的问题与需复查的创新性范围。",
      "previous": "1"
    },
    {
      "id": "3",
      "group": 0,
      "title": "创新性压力测试",
      "en": "Targeted novelty stress test",
      "platform": "Codex",
      "skill": "ARS · deep-research",
      "meaning": "针对广搜后剩余的创新性风险，再做一次定向攻击。",
      "tasks": [
        "承接广搜结论与未解决风险。",
        "聚焦剩余风险，核查最强 prior art。",
        "记录哪些主张存活、哪些失败、哪里仍然不确定。"
      ],
      "boundary": "不能用预制通用 Prompt 替代上阶段的真实科学结论。",
      "next": "4",
      "continuity": "承接 Stage 2 的科学问题、候选贡献、已找到的先例与剩余风险，聚焦尚未解决的创新性争议。",
      "previous": "2",
      "handoffFrom": "2"
    },
    {
      "id": "4",
      "group": 0,
      "title": "作者裁决创新性",
      "en": "Author-level novelty adjudication",
      "platform": "Chat",
      "skill": "作者科学判断",
      "meaning": "还做不做？如果做，真正能站住的贡献是什么？",
      "tasks": [
        "判断保留、重构、缩小，还是放弃。",
        "删除不成立的 novelty claims。",
        "若重构或缩小，重新确认问题、缺口、假设和贡献。"
      ],
      "boundary": "这个决定由作者与 Chat 做；不要为了保项目包装创新性。",
      "next": "5",
      "gate": "novelty",
      "continuity": "承接 Stage 3 已核验的先例、存活/失败的创新主张和不确定性，结合当前 Chat 的研究背景做作者裁决。",
      "previous": "3"
    },
    {
      "id": "5",
      "group": 1,
      "title": "最低充分研究设计",
      "en": "Minimum sufficient research design",
      "platform": "Chat",
      "skill": "科学设计讨论",
      "meaning": "为了回答问题，最低限度必须算什么？",
      "tasks": [
        "把分析分为必要、稳健性、可选和不必要四类。",
        "锁定样本、变量、阈值、对照、统计设计与推断边界。",
        "在计算前解决依赖性、缺失、混杂及失败条件。"
      ],
      "boundary": "优先最低充分设计，避免只因方法高级而添加分析。",
      "next": "6",
      "continuity": "承接 Stage 4 作者确认的问题、缺口、假设和可辩护贡献，以及实际可用的数据。若因审计返回，仅重判已指出的设计问题。",
      "previous": "4"
    },
    {
      "id": "6",
      "group": 1,
      "title": "设计可行性与有效性审计",
      "en": "Design feasibility and validity audit",
      "platform": "Codex",
      "skill": "ARS · experiment-agent",
      "meaning": "批准的设计在真实数据、代码和文件条件下可行吗？",
      "tasks": [
        "检查真实条件是否支持批准的设计。",
        "区分编码问题与会影响有效性的科学问题。",
        "明确给出通过或重大问题及证据。"
      ],
      "boundary": "阈值、样本、假设、统计设计出现重大问题时停止执行。",
      "next": "7",
      "gate": "audit",
      "returnTo": "5",
      "continuity": "承接 Stage 5 作者批准的具体设计与分析范围；读取实际数据、代码及变量说明，检验该版本是否可执行且有效。",
      "previous": "5",
      "handoffFrom": "5"
    },
    {
      "id": "7",
      "group": 1,
      "title": "执行批准的分析",
      "en": "Analysis implementation",
      "platform": "Codex",
      "skill": "普通 Codex",
      "meaning": "方案已经批准，现在把它真正算出来。",
      "tasks": [
        "复用项目结构，执行批准范围内的分析。",
        "保留核验中间产物、偏离记录和复现信息。",
        "生成命名清晰的结果表与初步图，并验证数值。"
      ],
      "boundary": "不加可选分析、不解释结果、不写论文。发现科学设计问题则停。",
      "next": "8",
      "continuity": "承接 Stage 6 审计通过的设计及作者批准范围；若由 Stage 8 返回，仅修复已定位的实现错误并核验受影响结果。",
      "previous": "6"
    },
    {
      "id": "8",
      "group": 1,
      "title": "稳健性与推断审计",
      "en": "Post-analysis inferential audit",
      "platform": "Codex",
      "skill": "ARS · experiment-agent",
      "meaning": "结果能不能信？实现是否偏离批准设计？",
      "tasks": [
        "核对实现与批准设计、样本及阈值的一致性。",
        "检查统计解释、负结果和剩余替代解释。",
        "标明不能作因果解释的结果及实现错误影响。"
      ],
      "boundary": "不要写稿；重要错误未解决时不能把结果当成已验证。",
      "next": "9",
      "gate": "results",
      "returnTo": "5",
      "fixTo": "7",
      "continuity": "承接 Stage 7 的实际代码、主要与稳健性结果、表格和初步图，对照已批准设计进行推断审计。",
      "previous": "7"
    },
    {
      "id": "9",
      "group": 2,
      "title": "建立主张—证据映射",
      "en": "Claim–Evidence map",
      "platform": "Chat",
      "skill": "作者科学解释",
      "meaning": "数据出来了，我们可以说什么、不能说什么？",
      "tasks": [
        "逐项区分描述、关联、推断和因果证据。",
        "核对稳健性、竞争性解释和过度主张。",
        "筛选不超过 3–5 个核心主张，保留重要负结果。"
      ],
      "boundary": "先解释结果，暂时不写论文。",
      "next": "10",
      "continuity": "承接 Stage 8 核实结果、关键数值、主要图表与推断限制。若由后续检查返回，仅重判受影响的主张。",
      "previous": "8"
    },
    {
      "id": "10",
      "group": 2,
      "title": "设计论文故事",
      "en": "Manuscript architecture",
      "platform": "Chat",
      "skill": "论文结构讨论",
      "meaning": "整篇论文如何围绕证据回答同一个科学问题？",
      "tasks": [
        "确定中心信息、标题方向、摘要逻辑和章节功能。",
        "按核心主张分配必要图表，图数由证据需要决定。",
        "输出完整结构、方法输入清单、期刊与作者批准状态。"
      ],
      "boundary": "暂不完整写全文；不要让 Discussion 超出 Results。",
      "next": "11",
      "continuity": "承接 Stage 9 作者确认的 3–5 个核心主张及证据，使用已确认或暂定目标期刊；若 Stage 11 返回，聚焦结构审计的问题。",
      "previous": "9"
    },
    {
      "id": "11",
      "group": 2,
      "title": "论文结构审计",
      "en": "Paper architecture audit",
      "platform": "Codex",
      "skill": "ARS · ars-plan",
      "meaning": "检查已经批准的故事有没有逻辑漏洞。",
      "tasks": [
        "检查结构与证据对应关系。",
        "识别逻辑跳跃、冗余和科学含义改变。",
        "区分可执行修正和需要作者判断的问题。"
      ],
      "boundary": "只审计，不重新发明一篇论文。",
      "next": "12D",
      "gate": "architecture",
      "returnTo": "10",
      "continuity": "承接 Stage 10 已批准的论文结构、核心主张、证据与图表分工，检查一致性而不重新创作故事。",
      "previous": "10",
      "handoffFrom": "10"
    },
    {
      "id": "12D",
      "group": 2,
      "title": "根据证据起草首稿",
      "en": "Evidence-grounded first draft",
      "platform": "Codex",
      "skill": "ARS · academic-paper full / 受限起草",
      "meaning": "已经批准的故事与结果，怎样形成第一份真实文稿？",
      "tasks": [
        "只沿批准的章节和核心主张起草首稿。",
        "逐个结果绑定真实表格、代码输出或图；引用绑定实际来源。",
        "缺失方法、数值或文献明确标出，交作者补齐。"
      ],
      "boundary": "无证据不写结论，不补造分析或引用；首稿不等于科学内容已批准。已有初稿时可跳过，但须提供来源与版本。",
      "next": "12",
      "continuity": "承接 Stage 11 已通过的结构审计，使用既有的主张与证据、实际分析方法和来源，仅在尚无初稿时起草。",
      "previous": "11"
    },
    {
      "id": "12",
      "group": 2,
      "title": "整合首稿与文件级修订",
      "en": "Manuscript execution",
      "platform": "Codex",
      "skill": "ARS · academic-paper revision mode",
      "meaning": "科学内容已决定，让 Codex 负责跨文件落实。",
      "tasks": [
        "按批准结构修改各部分与图注。",
        "跨摘要、主文、方法、补充材料检查一致性。",
        "标出会改变科学含义的修改请求。"
      ],
      "boundary": "初稿来自 Stage 12D 或作者真实文件；缺失证据标出，科学含义变动回 Chat。",
      "next": "13A",
      "continuity": "承接 Stage 12D 首稿及缺项，或 Stage 11 审核过结构的现有初稿，并落实作者实际确认的修正。",
      "previous": "12D"
    },
    {
      "id": "13A",
      "group": 2,
      "title": "让图承担科学证据",
      "en": "Publication figure audit / production",
      "platform": "Codex",
      "skill": "Nature · nature-figure",
      "meaning": "图怎样承担证据，而不只是变漂亮？",
      "tasks": [
        "逐 panel 判断必要性及证据贡献。",
        "选择编码、标注和主文/补充归属。",
        "输出可复现、清晰、满足投稿要求的图。"
      ],
      "boundary": "不因为某分析做过，就额外加 panel。",
      "next": "13B",
      "continuity": "承接 Stage 12 的当前稿件、核心主张和已核实结果，沿用 Stage 10 的图表分工。",
      "previous": "12"
    },
    {
      "id": "13B",
      "group": 2,
      "title": "统计报告 QA",
      "en": "Statistical reporting QA",
      "platform": "Codex",
      "skill": "Nature · nature-statistics",
      "meaning": "统计报告是否有错漏，跨章节是否一致？",
      "tasks": [
        "检查样本量、统计单位、重复观测、效应量和区间。",
        "核对 P 值、多重检验及模型说明。",
        "标出缺失信息与需要作者输入的内容。"
      ],
      "boundary": "不虚构信息；除真实有效性问题外不重新设计统计。",
      "next": "17A",
      "gate": "quality",
      "returnTo": "5",
      "fixTo": "12",
      "continuity": "承接 Stage 13A 的实际图件、图注及当前文稿，对照真实输出检查统计报告。",
      "previous": "13A"
    },
    {
      "id": "17A",
      "group": 3,
      "title": "主张与引用核对",
      "en": "Claim-to-citation audit",
      "platform": "Codex",
      "skill": "ARS · ars-citation-check",
      "meaning": "这篇文献真的支持我这句话吗？",
      "tasks": [
        "查无支持主张、引用错配和部分支持。",
        "核对引用是否被用于比原研究更强的结论。",
        "只报告需修正或作者核验的事项。"
      ],
      "boundary": "不盲改引用；这一步检查科学支持关系，不是书目信息。",
      "next": "17B",
      "gate": "quality",
      "returnTo": "9",
      "fixTo": "12",
      "continuity": "承接 Stage 13B 已处理的统计报告与当前稿件，新增核查主张和引用的支持关系。",
      "previous": "13B"
    },
    {
      "id": "17B",
      "group": 3,
      "title": "参考文献元数据核验",
      "en": "Reference metadata verification",
      "platform": "Codex",
      "skill": "Nature · nature-ref-verifier",
      "meaning": "参考文献的作者、卷期页码和 DOI 是否正确？",
      "tasks": [
        "逐字段核验作者、题名、期刊、年卷期、页码及发表状态。",
        "每处差异列出原值、核实值、证据与建议。",
        "保留不确定条目交作者确认。"
      ],
      "boundary": "不自动改动不确定条目；元数据正确不代表支持正文主张。",
      "next": "14",
      "gate": "quality",
      "returnTo": "9",
      "fixTo": "12",
      "continuity": "承接 Stage 17A 的引用支持核查，独立检查同一版本的参考文献元数据。",
      "previous": "17A"
    },
    {
      "id": "14",
      "group": 3,
      "title": "投稿前模拟审稿",
      "en": "Full pre-submission peer review",
      "platform": "Codex",
      "skill": "ARS · ars-reviewer",
      "meaning": "把稿子当成成熟投稿件，真正攻击一次。",
      "tasks": [
        "评价创新、重要性、有效性、稳健性和主张证据匹配。",
        "将重大问题的最小补救分成措辞、解释、重分析、新计算、根本设计问题。",
        "产出编辑评估与优先级修订路线。"
      ],
      "boundary": "不改稿，不因某分析有趣就要求新增。",
      "next": "15",
      "continuity": "承接已完成统计、主张—引用和元数据检查的当前完整稿件，依据目标期刊开展一次模拟审稿。",
      "previous": "17B"
    },
    {
      "id": "15",
      "group": 3,
      "title": "作者裁决 AI 审稿意见",
      "en": "Author adjudication",
      "platform": "Chat",
      "skill": "作者科学判断",
      "meaning": "AI Reviewer 提的意见，哪些真正值得采纳？",
      "tasks": [
        "逐条判断科学必要、策略有用、可选、不必要或有害。",
        "检查 concern 是否真实、是否影响中心主张。",
        "批准最低充分修订，明确拒绝建议与必要新计算。"
      ],
      "boundary": "不默认 AI Reviewer 正确，不满足全部 wish list。",
      "next": "16",
      "continuity": "承接 Stage 14 的模拟审稿报告；若由 Stage 16R 或 Stage 17F 返回，只裁决仍未解决或新增的实质问题。",
      "previous": "14"
    },
    {
      "id": "16",
      "group": 3,
      "title": "执行批准的投稿前修订",
      "en": "Approved pre-submission revision",
      "platform": "Codex",
      "skill": "ARS · academic-paper revision mode",
      "meaning": "只落实作者已经批准的修订。",
      "tasks": [
        "按作者批准范围修订。",
        "核实更改、结果与对应意见。",
        "保留实际修改记录，不自动开始复审。"
      ],
      "boundary": "不能把生成前的通用模板冒充作者批准的执行 Prompt。",
      "next": "16R",
      "continuity": "承接 Stage 15 作者真实批准的修改、拒绝建议、必要计算范围与需弱化主张，按这份裁决落实。",
      "previous": "15",
      "handoffFrom": "15"
    },
    {
      "id": "16R",
      "group": 3,
      "title": "聚焦复审",
      "en": "Focused re-review",
      "platform": "Codex",
      "skill": "ARS · academic-paper-reviewer re-review",
      "meaning": "只查上一轮问题是否解决，及修改是否引入新矛盾。",
      "tasks": [
        "对旧问题标记 Resolved / Partly resolved / Unresolved。",
        "只报告影响有效性或投稿的剩余问题。",
        "发现实质未解决问题时回作者裁决。"
      ],
      "boundary": "没有新证据不重开已解决问题，不发明可选分析要求。",
      "next": "13C",
      "gate": "audit",
      "returnTo": "15",
      "continuity": "承接 Stage 16 的实际修订稿、修改记录和原主要意见，进行限定复审。",
      "previous": "16"
    },
    {
      "id": "13C",
      "group": 3,
      "title": "最终英语润色",
      "en": "Final language polishing",
      "platform": "Codex",
      "skill": "Nature · nature-polishing",
      "meaning": "只修语言，保持科学内容锁定。",
      "tasks": [
        "改善清晰度、简洁度、语法和衔接。",
        "保持数值、引用、主张、因果强度和不确定性。",
        "对无法安全润色的句子提出作者确认。"
      ],
      "boundary": "不改样本、阈值、统计意义和证据强度。",
      "next": "17F",
      "continuity": "承接 Stage 16R 实质问题已解决的当前版本，只进行最终语言润色。",
      "previous": "16R"
    },
    {
      "id": "17F",
      "group": 3,
      "title": "最终文稿与投稿材料检查",
      "en": "Final submission consistency check",
      "platform": "Codex",
      "skill": "普通 Codex · 必要时对应专项 QA",
      "meaning": "修订和润色后，最终这版稿件仍然一致且材料齐全吗？",
      "tasks": [
        "以当前文件重新核对主张、数值、图表、引用与补充材料。",
        "对修订影响到的统计或引用重新核验；记录实际检查范围。",
        "整理作者仍需确认的投稿项，不能代填声明。"
      ],
      "boundary": "不能因旧版本通过而给新版本自动盖章；数据/代码可用性、署名、资助、利益冲突和 AI 使用等仅按真实情况与期刊要求确认。",
      "next": "18",
      "gate": "final",
      "returnTo": "15",
      "fixTo": "12",
      "continuity": "承接 Stage 13C 润色后的最终文件，定向核验本轮修改涉及的数字、图表、引用及投稿材料。",
      "previous": "13C"
    },
    {
      "id": "18",
      "group": 3,
      "title": "首次投稿 Cover Letter",
      "en": "Initial-submission cover letter",
      "platform": "Chat",
      "skill": "投稿信讨论",
      "meaning": "向编辑解释为什么这篇论文值得送审。",
      "tasks": [
        "简洁说明问题、如何回答及 2–3 个关键发现。",
        "强调真实贡献与期刊契合度。",
        "完成英文首次投稿信。"
      ],
      "boundary": "不重复摘要，不夸大创新或增加不存在的主张。",
      "next": "19",
      "gate": "submission",
      "continuity": "承接 Stage 17F 最终检查、当前文稿与 2–3 项核实发现，使用实际目标期刊准备首次投稿信。",
      "previous": "17F"
    },
    {
      "id": "19",
      "group": 4,
      "title": "解读真实审稿意见",
      "en": "Real reviewer interpretation",
      "platform": "Chat",
      "skill": "作者返修策略判断",
      "meaning": "审稿人真正担心什么？最低成本怎样解决？",
      "tasks": [
        "逐条判断 concern 的有效性及问题类别。",
        "确定措辞、解释、现有分析、重分析或真正新计算。",
        "确定修改位置、回复策略与最低充分修订路线。"
      ],
      "boundary": "先解读，不直接改稿、不立即重算。",
      "next": "20",
      "continuity": "使用作者新收到的真实编辑信、审稿意见和当前稿件；沿用已有研究结论。若由 Stage 20–22 返回，先处理交接中指出的返修争议。",
      "previous": "18"
    },
    {
      "id": "20",
      "group": 4,
      "title": "返修策略核验",
      "en": "Revision strategy verification",
      "platform": "Codex",
      "skill": "ARS · ars-revision-coach",
      "meaning": "批准的策略真的回应审稿人的 concern 吗？",
      "tasks": [
        "检查每个策略是否回应原问题。",
        "识别会改变中心主张的科学争议。",
        "明确通过或回作者重判。"
      ],
      "boundary": "此时不能改稿。中心主张受影响必须用 B 回 Chat。",
      "next": "21A",
      "gate": "coach",
      "returnTo": "19",
      "continuity": "承接 Stage 19 作者确认的逐条返修策略、原始意见、当前稿件与有/无新增计算的真实决定，只验证策略。",
      "previous": "19",
      "handoffFrom": "19"
    },
    {
      "id": "21A",
      "group": 4,
      "title": "审稿人要求的批准计算",
      "en": "Approved reviewer-requested computation",
      "platform": "Codex",
      "skill": "普通 Codex",
      "meaning": "只做解决审稿 concern 真正需要的最小计算。",
      "tasks": [
        "仅执行批准的计算并核验。",
        "说明结果是否回应 concern。",
        "标明受影响的 manuscript 位置。"
      ],
      "boundary": "不拓宽分析范围。若新结果改变科学含义，先回 Chat 裁决。",
      "next": "21B",
      "gate": "audit",
      "returnTo": "19",
      "continuity": "承接 Stage 20 核验通过且作者明确批准的新计算范围、对应意见和验收条件。",
      "previous": "20"
    },
    {
      "id": "21B",
      "group": 4,
      "title": "真实审稿后的正式修订",
      "en": "Manuscript revision",
      "platform": "Codex",
      "skill": "ARS · ars-revision",
      "meaning": "按批准路线真正修改论文。",
      "tasks": [
        "逐条落实与 reviewer concern 对应的更改。",
        "使数值可追溯，措辞匹配证据。",
        "保持术语、定义及因果强度一致。"
      ],
      "boundary": "不做未批准分析，不虚构已完成修改；完成改稿后停止。",
      "next": "22A",
      "continuity": "承接 Stage 20 通过的策略：需要计算时使用 Stage 21A 的核验结果；否则使用作者明确无需新计算的决定。",
      "previous": "20"
    },
    {
      "id": "22A",
      "group": 4,
      "title": "生成逐点回复",
      "en": "Response to reviewers",
      "platform": "Codex",
      "skill": "Nature · nature-response",
      "meaning": "把真实完成的修改组织成完整回复包。",
      "tasks": [
        "保留审稿人区分和意见编号。",
        "逐条给出意见、回应、实际修改、准确位置及新增结果。",
        "缺失信息明确标出，不补造。"
      ],
      "boundary": "保持专业、不防御；不声称不存在的分析或修改。",
      "next": "22B",
      "continuity": "承接 Stage 21B 实际修订稿与修改记录，使用原编辑信、原审稿意见及核验结果。",
      "previous": "21B"
    },
    {
      "id": "22B",
      "group": 4,
      "title": "回复信最终 QA",
      "en": "Final rebuttal QA",
      "platform": "Codex",
      "skill": "ARS · academic-paper rebuttal-audit",
      "meaning": "查漏答、答非所问，以及说改了却实际没改。",
      "tasks": [
        "检查逐条回应与 concern 的对应。",
        "核实更改和承诺计算确实完成。",
        "查文稿矛盾、漏项、回避和防御性措辞。"
      ],
      "boundary": "仅报告需纠正问题，不重新生成整封回复。",
      "next": "22C",
      "gate": "quality",
      "returnTo": "19",
      "fixTo": "22A",
      "continuity": "承接 Stage 22A 实际逐点回复，对照原意见、修订稿及实际完成的分析进行 QA。",
      "previous": "22A"
    },
    {
      "id": "22C",
      "group": 4,
      "title": "修回前最终一致性检查",
      "en": "Resubmission consistency check",
      "platform": "Codex",
      "skill": "普通 Codex · 定向复查",
      "meaning": "真实返修后的论文、回复与新增结果是否构成同一版本？",
      "tasks": [
        "复查新计算与修订影响的数字、图件、统计和引用。",
        "核实回复中每一处修改位置对应最终文稿。",
        "形成清洁稿、标记稿、回复信及期刊所需文件清单。"
      ],
      "boundary": "Rebuttal QA 通过并不代表新图表与引用自动通过。只做受影响范围复查；新科学争议回 Stage 19。",
      "next": "23A",
      "gate": "resubmit",
      "returnTo": "19",
      "fixTo": "21B",
      "continuity": "承接 Stage 22B 检查并修正后的回复与最终修订稿，仅复核改动涉及的一致性。",
      "previous": "22B"
    },
    {
      "id": "23A",
      "group": 5,
      "title": "最终可复现性审计",
      "en": "Final reproducibility audit",
      "platform": "Codex",
      "skill": "ARS · experiment-agent",
      "meaning": "独立研究者能再生核心统计量、表格和图吗？",
      "tasks": [
        "查缺脚本、绝对路径、版本、种子及未记录参数。",
        "检查手工操作与中间文件依赖。",
        "形成按优先级排列的复现缺口。"
      ],
      "boundary": "不暴露有意保持私有或专有的组件。",
      "next": "23B",
      "continuity": "使用当前选定的最终文稿及对应的真实统计、图表、代码和获批稳健性输出；可承接 Stage 22C 修回版本或 Stage 18 首次投稿版本。",
      "previous": "22C"
    },
    {
      "id": "23B",
      "group": 5,
      "title": "整理最小公开研究包",
      "en": "Minimum reproducible public package",
      "platform": "Codex",
      "skill": "普通 Codex",
      "meaning": "整理成别人能够复现、且范围已获准公开的最小包。",
      "tasks": [
        "组织 README、代码、图表脚本、可公开示例数据与环境。",
        "从公开包中排除临时文件、重复文件、凭据与私有数据。",
        "完成最终一致性检查。"
      ],
      "boundary": "整理公开包不等于自动公开；私有源文件应保留在原项目。",
      "next": null,
      "continuity": "承接 Stage 23A 复现缺口、实际复跑范围和公开限制，仅整理作者明确准许公开的组件。",
      "previous": "23A"
    }
  ]
};
