# 李敖交互式年表开发交接记录

生成日期：2026-04-20

## 项目目标

本项目依据 `leeao-new-directions.txt` 的“方向二：李敖交互式年表”，用《大李敖全集5.0》（wjm_tcy版）分章节文本逐书、逐轮增量制作李敖年表。

用户当前口径非常明确：

1. 不一次性读取 163 本全集，必须一本一本、章节一段一段增量推进。
2. 年表要“大而全”，大事件、小事件、日常、身体、感情、书信、读者反馈、司法细节都可以进入。
3. 不能添加和李敖无关的旁人事件。旁人材料只有在李敖行动、写作、通信、判断、交游、诉讼、被牵连时才入表。
4. 最终文本会出版成书，数据要可校对、可追源，但用户更重视“大而全”，不要因出版顾虑过度删减。
5. 时间尽量精确到日；无法确日的项目也可入库，但必须标明 `datePrecision`，并用 `displayDate` 保留原文形态。
6. 同一年内排序规则：精确到日的条目在前，模糊时间项在后。
7. 每条事件保留书名、章节、文件路径、转码后行号。
8. 交叉引用的事件要认真校对，跨书同案用 `crossReferences` 串起来，不要乱挂。
9. 每轮新增后更新 `data/ingestion-log.json`，重新导出 `exports/leeao-current-timeline.txt`。

## 工作目录

项目路径：

```bash
/home/aihuashanying/leeao-life
```

这是 git 仓库。接手时先看：

```bash
git status --short
```

当前交接时工作树已有未提交修改，至少包括：

```text
README.md
app.js
data/ingestion-log.json
data/timeline-events-fifth-book.json
data/timeline-events-sixth-book.json
exports/leeao-current-timeline.txt
tools/export-timeline-text.mjs
DEVELOPMENT_HANDOFF.md
```

不要回退用户或前一位 agent 的改动。

全集分章节文本路径：

```bash
《大李敖全集5.0》（wjm_tcy版）分章节
```

全集正文多为 GB18030 编码。读取正文时使用：

```bash
iconv -f GB18030 -t UTF-8 "<章节路径>" | nl -ba
```

日期命中工具：

```bash
node tools/find-dated-lines.mjs '《大李敖全集5.0》（wjm_tcy版）分章节/001.自传回忆类/006.李敖议坛哀思录'
```

注意：`tools/find-dated-lines.mjs` 接受单本书目录，不是单个 txt 文件。

## 当前数据文件

页面和导出脚本当前合并以下文件：

```text
data/timeline-events.json
data/timeline-events-first-book-supplement.json
data/timeline-events-first-book-broad.json
data/timeline-events-first-book-daily.json
data/timeline-events-second-book.json
data/timeline-events-second-book-broad.json
data/timeline-events-second-book-evidence.json
data/timeline-events-third-book.json
data/timeline-events-third-book-qiao-evidence.json
data/timeline-events-fourth-book.json
data/timeline-events-fourth-book-deepening.json
data/timeline-events-fifth-book.json
data/timeline-events-sixth-book.json
```

同步位置：

```text
app.js 的 dataFiles
tools/export-timeline-text.mjs 的 dataFiles
```

新增数据文件时两边都要同步。

## 当前计数

截至第六本第五轮结束：

```text
data/timeline-events.json                         32
data/timeline-events-first-book-supplement.json   58
data/timeline-events-first-book-broad.json        46
data/timeline-events-first-book-daily.json        50
data/timeline-events-second-book.json             67
data/timeline-events-second-book-broad.json       27
data/timeline-events-second-book-evidence.json    37
data/timeline-events-third-book.json              70
data/timeline-events-third-book-qiao-evidence.json 16
data/timeline-events-fourth-book.json             115
data/timeline-events-fourth-book-deepening.json   29
data/timeline-events-fifth-book.json              220
data/timeline-events-sixth-book.json              36
总计                                             803
```

`exports/leeao-current-timeline.txt` 表头已同步：

```text
事件总数：803
日期精度统计：day=591；year=43；undated-range=1；undated-context=99；season=17；lunar-day=1；year-after=6；month=19；half-year=2；day-range=9；month-after=2；year-range=4；year-about=5；day-after=3；year-end=1
```

## 当前处理进度

处理日志的完整记录在：

```bash
data/ingestion-log.json
```

当前最新轮次为 `iteration: 32`。

已处理到第六本：

```text
001.李敖自传与回忆
002.李敖自传与回忆续集
003.我最难忘的事和人
004.李敖回忆录
005.李敖快意恩仇录
006.李敖议坛哀思录
```

第五本《李敖快意恩仇录》已经停止深挖，并完成 1960-1961 重复事件校正，当前定格在 220 条。

第六本《李敖议坛哀思录》已推进到第五轮，当前 36 条。

## 第六本当前状态

第六本数据文件：

```text
data/timeline-events-sixth-book.json
```

第六本已处理章节：

```text
008.从参选到上台.txt
018.我告诉你，就是狗.txt
019.我闻过他们的臭脚.txt
020.老贼化的民进党.txt
021.上将割屌记.txt
022.我高潮，你刹车.txt
062.公听会听我言.txt
065.我当场撕掉国防部文件.txt
081.喷瓦斯事件.txt
023.应该去跟妇产科医生讲.txt
024.为什么不从大的战略来考虑.txt
025.第一被告是谢长廷，第二就是你.txt
026.用衣冠整禽兽.txt
027.历史会证明我们同归于尽.txt
028.长廷啊，不要在后台唱戏.txt
030.民进党中有我“卧底”的.txt
032.李文仪与潜艇采购.txt
033.去他妈的话.txt
034.军人，谁要你们舞文弄墨！.txt
035.钢笔事件.txt
037.安全不是黑暗作业的护符.txt
038.“大师说是真的，那大概就是真的。”.txt
039.国安局礼遇“强奸犯”李登辉.txt
040.“阴门阵”与“屁股阵”.txt
041.副局长要毒死谁？.txt
042.还是档案被销毁了？.txt
043.国安局密件落在我手里.txt
044.局长想赖？.txt
045.香蕉好吃吗？.txt
```

当前已补入的骨架条目：

- 2004-10-12 办理立委参选登记。
- 2004-11-14 国父纪念馆公开演讲，为参选期间唯一正式活动。
- 2005-02-01 就职立委，并在中兴大楼1108号研究室公布“四不一没有”。
- 2005-03-09 首次质询国防部长李杰，围绕6108亿军购与《与台湾关系法》展开正面冲突。
- 2005-03-10 质询退辅会主委高华柱，集中谈老荣民、住房、大陆配偶与生命史记录。
- 2005-03-16 在国防与预算及决算联席委员会抗议李文忠护航执政党国防预算。
- 2005-03-17 再次质询李杰，继续攻击军购与“美国把台湾当狗”的逻辑。
- 2005-03-17 质询吴钊燮，要求陆委会按《宪法》与《国统纲领》为两岸关系“踩刹车”。
- 2006-01-02 在重大军事采购政策公听会上提出哥斯达黎加无军队模式，并设想按《与台湾关系法》告小布什。
- 2006-01-05 质询国防部副部长蔡明宪，指出 GDP 3% 报告数据错误并当场撕掉国防部文件。
- 2006-10-24 在立法院程序委员会喷催泪瓦斯阻挡军购案付委。
- 喷瓦斯事件后，《苹果日报》头条与法律责任讨论、林深靖《李敖与V怪客》及海外网友反馈已作为媒体回响入库。
- 2005-03-21 质询霍守业，要求国防部证明台海战争不能打。
- 2005-03-23 质询李杰，提出 P-3C 军租和台湾不设防思考。
- 2005-03-24 质询李杰，称将以谢长廷为第一被告、李杰为第二被告追究潜艇军购与公投法问题。
- 2005-03-30 两场质询分别围绕《海军服饰条例》追打查勤事件、反恐挂钩与军队人心问题。
- 2005-04-12 院会质询谢长廷，拆成军购与军租、法律中的“中国”、为林弘宣请命并批评杜正胜三条。
- 2005-05-02 质询李杰，借李文仪笑话谈潜艇采购与拖延战略。
- 2005-05-12 在《法医师法》联席会议为陈耀昌版本作人品证人。
- 2005-05-12 在本土语言政策公听会反对让孩子负担“妈妈的话”政策。
- 2005-05-18 质询蔡明宪，要求国防部停止大量军中文宣刊物。
- 2005-05-23 质询李杰追问特别预算与军租进度，并当众退还万宝龙钢笔、要求处理谢大宁案。
- 2005-03-14 质询薛石民，追问国安局机密报告、密账、台综院款项，并拿出李登辉争诺贝尔和平奖密件。
- 2005-03-28 再质询薛石民，要求国安局告李登辉并假扣押台综院财产，同时批评国安局报告制造两岸仇恨。
- 2005-05-04 质询王进旺，追问台综院追款律师、刘冠军下落、徐炳强判决书与台综院第四所。
- 2005-05-12 质询薛石民，追问徐炳强判决书、李登辉批文档案和诺贝尔和平奖密件预算。
- 2005-10-13 以“香蕉好吃吗”开场质询薛石民，拒看会后收回报告，并批评国安局缺少化敌为友视野。

第六本当前最值得继续的路线：

1. 可继续处理 `046-050`，这组看起来是杜正胜、大学校长、李远哲等教育/学术行政质询线，预计仍有日级材料。
2. `036.国家安全局对我下毒？.txt` 暂未单独入库：它含送香蕉、退国安局礼金、国安局视察换便当等日常，但日期不精确；后续可在第六本模糊项轮次集中补。
3. `031.我炮口转向了.txt` 暂未入库：它是李敖转向诉讼/外部攻击的策略说明，缺精确日期；后续可在 2005 年模糊项集中处理时加入。
4. 再分批处理 `134-142` 的起诉状与立法院公报，按“每轮只吃几份”原则拆成法律/院会链，不要一口气吞大文件。
5. 继续时要注意：Book 6 原始 txt 多为 GB18030，直接 Read 常出现乱码；可靠流程是先 `iconv -f GB18030 -t UTF-8 ... | nl -ba`，再据此写 source.line。

## 第五本已完成重点

第五本数据文件：

```text
data/timeline-events-fifth-book.json
```

主要处理章节：

```text
001.陆根纪
002.苗蚩纪
003.犬儒纪
004.彭尸纪
005.寒武纪
006.三叠纪
007.梦遗纪
009.白露纪
010.根株纪
012.东郭纪
017.猪猡纪
018.闹衙纪
019.宣淫纪
020.志留纪
```

第五本已经补入的大块包括：

- 生日异说、二姐回忆、台中图书馆书目工程、少年诗、台大法专退学、与“罗”的爱情节点。
- 1959-1960 预官日记中的训练、拒绝入党、下部队、行军和社会观察。
- 1962-1963 性观念文章：《给谈中西文化的人看看病》《由一丝不挂说起》《论“处女膜整型”》。
- 《白露纪》H 线：1964-05-01 租水源大楼并在君子行认识 H；1964-08-04、09-09、09-28、09-30、10-03 至 04 给 H 的书信。
- 《白露纪》小Y线：1967 年春认识小Y，以及 1967-03-21、03-23、03-28、03-31、04-03/04、04-07、04-10、04-11、04-12、04-23、04-27、05-07、05-09、08-24 等密集情书节点。
- 身体/感情/日常线：四席小屋时代初次买卖性经验、上海咖啡馆女老板一夜关系、阿贞一夜关系、孙之森带李敖到江山楼和宝斗里观察、汝清、君君、小叶、静美、林家祺、小苏、安、CCY 等。
- 收藏/视觉线：《夏日即景》裸女画、PLAYBOY 折页裸照、1963 年 1 月号 Judi Motercy 中页照片。
- 1985 五十岁生日礼物信：苏荣泉和李放送三义木雕达摩佛像后被折现、曾心仪衬衫、李宁古董花瓶、陈文茜《We Are The World》唱片、香港《九十年代》转来李惠慈读《三毛式伪善》后的来信。
- 《根株纪》文星后交游/恩怨：梁实秋拒作保、1987 年梁实秋版权通信、余光中邀李敖参加师大现代诗朗诵会和课堂演讲、何凡饭局争执、林海音预订“告别文坛十书”、王敬羲香港《文星》刊《借古不讽今》不付版税、王敬羲后续支持/造谣/萧孟能案。
- 《根株纪》版权案簇：李敖代理朱婉坚/朱婉清追究文星旧版权，与余光中、蔡文甫、林海音在法庭交锋。
- 《东郭纪》柏杨线：1971-07-17《新共和》报道柏杨冤狱、1972-02-29 柏杨为李敖优先办借书证并选《生命的光辉》、1972 年 4 月绿岛礼物转告、柏杨出狱后借书、李敖婚后胡茵梦提议请柏杨吃饭未成。
- 《闹衙纪》国家赔偿链：台北市政府、高雄市政府、台中市政府藏书查扣案。
- 《宣淫纪》按用户“大而全”口径已保留身体、感情、性文字和日常材料，用中性摘要，不猎奇化。
- 《志留纪》：汪荣祖信、黄妮娜信、郑淑敏称赞《北京法源寺》、《政治家》访谈、《我要吻周联华》、林荣三案赔偿支票、遗体捐献安排、黄石城稿费转林正杰、小苏保险理赔等。
- 《志留纪》本轮又补入 4 条晚年 authorial/context 层节点：Frank Harris《My Life and Loves》参照、李鸿章/戴高乐式自我定位、乔·路易斯 Brown Bomber 比喻、以及“期中结账”式整理人类观念与行为的终身计划。

## 第五本关键注意事项

1. `朱婉坚` 与 `朱婉清`：源文中多见“朱婉坚”，此前部分条目写作“朱婉清”。继续时不要擅自大规模改名，先以原文校对；如果统一，应保留别名说明。
2. 1987-05-07 第四本日记不是朱婉坚版权案确日。已核原文，它是“控司马文武等八人”案，不能挂到余光中、蔡文甫、林海音版权案。
3. 朱婉坚版权案簇目前仍多为 `1987-12-31`、`datePrecision=year-about` 暂挂，后续要从其他诉讼文集、报刊访问或法院文书线索找具体庭期。
4. H 后来赴美、婚变、再婚等多属 H 自身后事，本轮没有作为独立李敖事件。只有找到李敖通信、写作、行动中的具体关联，才补。
5. 第五本里大量旁人丑闻、婚恋、政治旧事不能直接变成年表事件；必须问一句：这是李敖做了什么、写了什么、遭遇了什么、判断了什么，还是只是旁人传记？
6. 身体/性材料可以收，但摘要保持研究口吻，避免渲染。用户要“大而全”，不是要八卦化。
7. 第八轮已验证：`009.白露纪` 与 `010.根株纪` 仍有潜在增量，但前者重复风险高、后者编码污染重；除非拿到更干净文本或外部旁证，不宜为凑数量硬写。
8. `book5-undated-huang-shicheng-fee-transferred-to-lin-zhengjie` 的外部搜索已找到一个重要旁证：whatot / books.leeao.net 镜像中的《李敖对话录》“才华盖世侠骨柔情的思想家”一篇，末署“李宁访问，1982年3月16日”，文中有“黄石城果然给了我三万，可是我把这钱转给林正杰当竞选经费了”。这证明李敖最迟在 1982-03-16 已公开这样叙述，但**仍未取得原刊扫描或权威目录页来确认这是不是原始发表日期，更不能直接等同于稿费转交发生日**；在拿到原刊之前，不要把该事件机械改成 day。
9. `book5-undated-su-rongquan-insurance-claim-recovered` 的外部搜索目前**没有**找到可安全落到具体年月日的 contemporaneous 报刊、法院文书或保险业资料；只找到李敖相关数字化文集里的回忆性说法与大量无关保险判决噪音。现阶段应继续保持 `undated-context`，不要为了路线1硬改精确日。

## 第四本状态

第四本文件：

```text
data/timeline-events-fourth-book.json
data/timeline-events-fourth-book-deepening.json
```

当前合计 148 条。

第四本主干已从 1949 年推进到 1997-03-31，完成度较高，后续主要是加厚：

- 《前程》：方豪、徐熙光、柏杨/林正杰/彭明敏、待客之道、树敌哲学、恋爱/意淫观等还可细拆。
- 《口诛》：东吴、章孝慈、公开演讲、电视节目、媒体反馈还可细拆。
- 《二进宫》：狱中生活细节、书信检查、放封、狱友互动仍可补。
- 台中/台大：老师、同学网络、家计痕迹、恋爱细节仍有可补空间。

重要已校点：

- `book4-1987-05-07-diary-on-litigation-as-joyful-justice` 是司马文武等八人案，不是文星版权案。
- `book4-deep-1979-after-return-ping-xintao-introduces-sanmao` 已被第五本李惠慈/三毛来信条交叉引用。

## 前三本状态

前三本都已进入“可继续回补但主干可暂告一段落”的状态。

第一本：

- 基础 32 条。
- 补充 58 条。
- 宽日期/复出链 46 条。
- 日常痕迹 50 条。

第二本：

- 主干 67 条。
- 宽日期/背景 27 条。
- 司法/监所证据链 37 条。
- 可回补方向：萧孟能案合同/判决/存证信日期、《监狱学土城？》更细监所日常、附证清单中的民国纪年证据。

第三本：

- 主干 71 条。
- 乔家才证据链 16 条。
- 可回补方向：`016.我最难忘的一个国特.txt` 后半长附录中的监牢生态、总统府资料组、王崇五探视、郑介民催办证明书等，但仍要限制为李敖取材、判断、引用链的一部分。

## 数据结构

事件对象基本形态：

```json
{
  "id": "book5-1985-04-25-receives-hong-kong-li-huici-letter-about-sanmao",
  "date": "1985-04-25",
  "displayDate": "1985年4月25日",
  "datePrecision": "day",
  "title": "香港《九十年代》转来李惠慈因读《三毛式伪善》写给李敖的信",
  "summary": "……",
  "view": ["读者线", "思想线", "交游线"],
  "tags": ["李惠慈", "九十年代", "三毛式伪善", "香港读者", "五十岁生日"],
  "people": ["李敖", "李惠慈", "三毛"],
  "places": ["香港", "台北"],
  "works": ["三毛式伪善", "九十年代", "李敖快意恩仇录"],
  "certainty": "confirmed",
  "crossReferences": ["book5-1985-04-26-birthday-gift-letter", "book4-deep-1979-after-return-ping-xintao-introduces-sanmao"],
  "source": {
    "book": "李敖快意恩仇录",
    "chapter": "009.白露纪",
    "path": "《大李敖全集5.0》（wjm_tcy版）分章节/001.自传回忆类/005.李敖快意恩仇录/009.白露纪.txt",
    "line": 19
  }
}
```

字段说明：

- `date`：机器排序用，必须是 `YYYY-MM-DD`。
- `displayDate`：给人看的原文日期形态。
- `datePrecision`：常见值有 `day`、`month`、`year`、`season`、`day-range`、`undated-context`、`year-about` 等。
- `certainty`：常见值 `confirmed` 或 `inferred`。
- `crossReferences`：可选数组，填其他事件 ID。
- `source.line`：GB18030 转 UTF-8 后，用 `nl -ba` 看到的行号。

不要把排序日期当成已校准日期。只有年份的可挂到年末，例如 `1987-12-31`，但必须用 `datePrecision` 和 `displayDate` 标清。

## UI 状态

用户曾要求把 UI 上“条日级事件”改为“条事件”，已完成。

位置：

```text
index.html
```

当前显示：

```html
<span>条事件</span>
```

弹窗支持显示交叉引用，逻辑在：

```text
app.js openEvent()
```

排序逻辑在：

```text
app.js compareEvents()
tools/export-timeline-text.mjs compareEvents()
```

两边都按“同一年内日级在前、模糊在后”处理。

## 校验命令

每轮新增后建议跑：

```bash
node --check app.js
```

完整数据、重复 ID、交叉引用、日期格式校验：

```bash
node -e "const fs=require('fs'); const files=['data/timeline-events.json','data/timeline-events-first-book-supplement.json','data/timeline-events-first-book-broad.json','data/timeline-events-first-book-daily.json','data/timeline-events-second-book.json','data/timeline-events-second-book-broad.json','data/timeline-events-second-book-evidence.json','data/timeline-events-third-book.json','data/timeline-events-third-book-qiao-evidence.json','data/timeline-events-fourth-book.json','data/timeline-events-fourth-book-deepening.json','data/timeline-events-fifth-book.json','data/timeline-events-sixth-book.json']; const all=files.flatMap(f=>JSON.parse(fs.readFileSync(f,'utf8')).map(e=>({...e,file:f}))); const ids=new Set(all.map(e=>e.id)); const dup=all.map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i); const missing=[]; const bad=[]; for(const e of all){ if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(e.date)) bad.push([e.id,e.date]); if(!e.source?.line) bad.push([e.id,'missing source.line']); if(!Array.isArray(e.view)) bad.push([e.id,'missing view']); for(const r of e.crossReferences||[]) if(!ids.has(r)) missing.push([e.id,r]); } console.log(JSON.stringify({events:all.length,fifth:JSON.parse(fs.readFileSync('data/timeline-events-fifth-book.json','utf8')).length,sixth:JSON.parse(fs.readFileSync('data/timeline-events-sixth-book.json','utf8')).length,dups:dup.length,missingRefs:missing.length,badDatesOrFields:bad.length,missing:missing.slice(0,10),bad:bad.slice(0,10)}, null, 2)); if(dup.length||missing.length||bad.length) process.exit(1);"
```

导出纯文本：

```bash
node tools/export-timeline-text.mjs
```

当前最后通过的校验：

```json
{
  "events": 803,
  "fifth": 220,
  "sixth": 36,
  "dups": 0,
  "missingRefs": 0,
  "badDatesOrFields": 0
}
```

## 建议下一步

当前用户已明确：**终止第5本的深挖，进入第6本《李敖议坛哀思录》**。

因此接手后默认路线应是：**继续第6本，而不是回到第5本。**

第六本最值得继续的路线：

1. 优先处理 `046-050`，预计可补教育/学术行政质询线，尤其要看 2005-10-13 “赶去科技委员会宰李远哲”是否与 050 章衔接。
2. 回头集中处理 `031.我炮口转向了.txt` 和 `036.国家安全局对我下毒？.txt` 这类缺确日但能说明李敖策略/日常动作的模糊项，确保放在对应年份精确日级事件之后。
3. 再分批处理 `134-142` 的起诉状与立法院公报。不要一口气吞下全部大文件，宜每轮只吃几份，拆成法律行动链与院会/委员会链。
4. 第六本处理时优先补 2005-2006 的问政/军购/国安/两岸主线，把李敖立委任内时间轴先做厚，再回头吃长附录。
5. 继续严格使用 GB18030 → UTF-8 转码后行号：`iconv -f GB18030 -t UTF-8 ... | nl -ba`。Book 6 直接 Read 常出现乱码，不能据乱码行号写 source.line。

第五本留存的已知待办，不是当前主线，但可供将来回补时参考：

- 黄石城/林正杰条：已有 `1982-03-16` 的**候选访谈日期**（《李敖对话录》镜像所示“李宁访问，1982年3月16日”），可作为后续追原刊的锚点，但在找到原刊扫描、目录记录或同时代报刊转载前，不足以把“转交竞选经费”事件本身改成 day。
- 苏荣泉保险条：当前没有找到 exact date；下一步应优先检索台湾旧报数据库、司法院旧裁判书索引、以及《现代保险》这类行业期刊，而不是继续泛搜网页。

如果接手 agent 想先做第六本质量整理：

1. 检查 `data/timeline-events-sixth-book.json` 中的摘要口径是否与前五本一致，特别是“政治线 / 立法院线 / 军购线 / 两岸线”的标签使用是否稳定。
2. 抽样核第六本首轮 8 条的 source.line 是否全部对应 GB18030 转码后的实际行号。
3. 第六本继续时，可先做一个 `2005-05` 到 `2005-10` 的章节-日期对照表，避免后来把同日不同委员会质询混成一条。

## 操作提醒

1. 用 `rg` 查找文本和 ID。
2. 编辑用 `apply_patch`。
3. 不要删除或回退现有改动。
4. 不要把旁人事件扩成李敖年表。
5. 不要伪精确。无法确日就用 `datePrecision` 标待校。
6. 每轮结束必须同步四件事：JSON、`data/ingestion-log.json`、`README.md` 当前进度、`exports/leeao-current-timeline.txt`。
7. 纯文本备份是研究人员校对用的重要输出，不能漏导。
