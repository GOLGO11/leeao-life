# 李敖交互式年表

一条按日推进的李敖年表原型，依据 `leeao-new-directions.txt` 的“方向二：李敖交互式年表”制作。

## 当前进度

- 已建立静态交互页面：`index.html`
- 已建立事件数据：`data/timeline-events.json`
- 已建立第一本补充数据：`data/timeline-events-first-book-supplement.json`
- 已建立第一本宽日期数据：`data/timeline-events-first-book-broad.json`
- 已建立第一本日常痕迹数据：`data/timeline-events-first-book-daily.json`
- 已建立第二本第一轮数据：`data/timeline-events-second-book.json`
- 已建立第二本宽日期/背景数据：`data/timeline-events-second-book-broad.json`
- 已建立第二本司法/监所证据链数据：`data/timeline-events-second-book-evidence.json`
- 已建立第三本第一轮数据：`data/timeline-events-third-book.json`
- 已建立第三本乔家才黑牢证据链第二轮数据：`data/timeline-events-third-book-qiao-evidence.json`
- 已建立第四本第一轮数据：`data/timeline-events-fourth-book.json`
- 已建立第四本深挖增量数据：`data/timeline-events-fourth-book-deepening.json`
- 已推进第五本第八轮数据并完成1960-1961重复事件校正：`data/timeline-events-fifth-book.json`（220 条）
- 已推进第六本第二十三轮数据：`data/timeline-events-sixth-book.json`（160 条）
- 已完成第七本 closeout：`data/timeline-events-seventh-book.json`（78 条，阶段性收束）
- 已建立第八本第七轮数据：`data/timeline-events-eighth-book.json`（42 条）
- 已建立《传统下的独白》第六轮数据：`data/timeline-events-traditional-monologue.json`（41 条）
- 已建立《传统下的再白》第三轮数据：`data/timeline-events-traditional-monologue-sequel.json`（18 条）
- 已建立《独白下的传统》第二轮数据：`data/timeline-events-monologue-under-tradition.json`（10 条）
- 已建立《李敖文存》第三轮数据并完成目录级扫完：`data/timeline-events-wencun.json`（24 条）
- 已建立《李敖文存二集》第三轮数据：`data/timeline-events-wencun-two.json`（32 条）
- 已建立《波波颂》第三轮数据：`data/timeline-events-bobo-song.json`（57 条）
- 已建立《李敖全集》第五轮数据并完成 closeout：`data/timeline-events-li-ao-complete-works.json`（39 条）
- 已建立《教育与脸谱》第二轮数据并完成 closeout：`data/timeline-events-education-and-faces.json`（19 条）
- 已建立《文化论战丹火录》第四轮数据并完成 closeout / 交叉引用复核：`data/timeline-events-cultural-debate-danhuo.json`（12 条）
- 已建立《为中国思想趋向求答案》第三轮数据并完成 closeout：`data/timeline-events-thought-trend-answer.json`（10 条）
- 已建立《上下古今谈》第九轮数据并完成 closeout：`data/timeline-events-shangxia-gujin-talks.json`（60 条）
- 已建立《世论新语》第十四轮数据：`data/timeline-events-shilun-xinyu.json`（72 条）
- 已建立《求是新语》第九轮数据并完成第十轮 closeout：`data/timeline-events-qiushi-xinyu.json`（70 条，阶段性收束）
- 已建立《我是天安门》第二轮数据：`data/timeline-events-woshi-tiananmen.json`（37 条）
- 已建立逐书处理日志：`data/ingestion-log.json`
- 已生成研究校对用当前总表：`exports/leeao-current-timeline.txt`
- 当前已处理《李敖自传与回忆》《李敖自传与回忆续集》《我最难忘的事和人》《李敖回忆录》《李敖快意恩仇录》《李敖议坛哀思录》《李敖风流自传》《李敖相关》《传统下的独白》《传统下的再白》《独白下的传统》《李敖文存》《李敖文存二集》《波波颂》《李敖全集》《教育与脸谱》《文化论战丹火录》《为中国思想趋向求答案》《上下古今谈》《世论新语》《求是新语》《我是天安门》的增量章节；其中《求是新语》第十轮 closeout 没有新增条目，维持 70 条，但把整本 `001-194` 的 keep-out 池重新收紧了一遍：`164` 仍因“14日”与“7月1日”涨价背景混锚不宜硬判，`191` 仍因 `8月8日` 报上消息与 `7月3日` 电话旧闻并列不宜硬判，`163 / 166 / 174 / 189` 的通讯社电头继续不单立本栏事件，其余 `161 / 165 / 167 / 168 / 170 / 179 / 185 / 187 / 190` 也都没有出现足以单独立条的新锚点。到这里，《求是新语》可以视为**阶段性收束**，后续若再回看，优先做的是 keep-out 池复核、跨书互校和少量交叉引用小修，而不是继续按章号深挖。《我是天安门》前两轮则持续沿文末完整署日与正文完整中文年月日推进：第一轮先把 1983、1988、1989、1990、1991 五个时间层的骨架立起来，新收 `001 / 002 / 004 / 005 / 006 / 007 / 008 / 009 / 010 / 011 / 012 / 013 / 014 / 021 / 022 / 023 / 027 / 030 / 035 / 036 / 037 / 038 / 039` 共 23 章；第二轮再补 `016 / 017 / 018 / 019 / 020 / 024 / 025 / 026 / 028 / 029 / 032 / 033 / 034 / 040` 共 14 章，把时间层继续推进到 1993 与 1996，累计达到 37 条。当前仍保守暂缓 `003`（`10月7日 / 10月1日 / 1983年11月16日夜` 多重锚点竞争）、`015`（只有 `1990年1月9-14日` 范围日期）与 `031`（只有“一九九一年五月”月份级署日，不伪装成日级事件）。《世论新语》第十四轮则继续沿用同一保守规则：只收正文开头或紧邻开头出现的单一月日锚点，并把年份锁在本书1989年专栏语境下，以 `certainty: inferred` 明示“年可推、日有文”；最近一轮改做全书漏网章回补，新补 `078 / 146` 两章，继续不放宽 keep-out 池边界。第七本《李敖风流自传》已完成最后一次模糊项筛查与阶段性收束，后续仅保留跨书互校式回补；第八本《李敖相关》当前定格在 42 条、作为参考资料层稳定补缝；《传统下的独白》已推进到第六轮、基本摸清尾段；《传统下的再白》已推进到第三轮，现已具备骨架、主题簇与最硬的王世杰证据链节点；《独白下的传统》已阶段性封卷；《李敖文存》已推进到第三轮并完成 001-020 全目录覆盖，当前进入阶段性收束；《李敖文存二集》已推进到第三轮，又补进《李敖告别文坛十书 / 卖牛肉面》广告链的两颗关键钉子；《波波颂》已完成目录级覆盖与收口，当前 57 条，可视为阶段性完成；《李敖全集》已完成第五轮 closeout，当前 39 条，已可视为阶段性封卷；《教育与脸谱》已完成 closeout，当前 19 条，高教讨论回响与李济 / 中研院主线已经立住，后续只需跨书互校式小修；《文化论战丹火录》已完成 closeout 与交叉引用复核，当前 12 条，现已立住论战爆发、升级、阵营动员、重磅介入与编纂收束的骨架，后续仅保留跨书互校式小修；《为中国思想趋向求答案》已完成 closeout，当前 10 条，现已立住序文、核心答案、论战分文、尾声收束与后记动作，后续只保留跨书互校式小修；《上下古今谈》已完成 closeout，当前 60 条，连载层、尾段收束层与书信善后层都已补齐，后续仅保留 `031.李敖不可怕` 这类月份级模糊项的跨书互校式回补。

## 增量规则

1. 每次只处理一本书或一个明确章节目录。
2. 正式事件必须有 `YYYY-MM-DD` 日期。
3. 仅年、仅月、季节、约略时间进入“待校日”层，使用 `displayDate` 显示原文日期，等待后续材料校到日。
4. “一天”“有一次”等日常片段进入“日常线”，使用 `datePrecision=undated-context` 或类似值标记，排序日期只作临时挂靠。
5. 同一年内先排列精确到日的事件，再排列仅年/月/季节/上下文暂挂的模糊时间项。
6. 每条事件保留书名、章节、文件路径和转码后行号。
7. 同案、同证据链或互相校对的条目使用 `crossReferences` 保留交叉引用。
8. 新增事件后同步更新 `data/ingestion-log.json`。

## 辅助命令

```bash
node tools/find-dated-lines.mjs '《大李敖全集5.0》（wjm_tcy版）分章节/001.自传回忆类/001.李敖自传与回忆'
```

全集文本多为 GB18030 编码，脚本会按 GB18030 解码并列出疑似日期行，供人工筛选。

导出研究校对用纯文本年表：

```bash
node tools/export-timeline-text.mjs
```

输出文件为 `exports/leeao-current-timeline.txt`。该文件会合并当前已处理书籍的所有 JSON 数据，并保留日期精度、来源章节、行号、标签、交叉引用和数据 id。

## 打开方式

由于页面使用 `fetch()` 读取 JSON，建议在项目目录启动一个静态服务器：

```bash
python3 -m http.server 4174
```

然后访问 `http://localhost:4174/`。
