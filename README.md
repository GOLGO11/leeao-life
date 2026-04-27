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
- 已建立《我是天安门》第三轮数据并完成 closeout：`data/timeline-events-woshi-tiananmen.json`（40 条，阶段性收束）
- 已建立《你是景福门》第五轮 closeout 数据：`data/timeline-events-jingfumen.json`（57 条）
- 已建立《为自由招魂》第六轮 closeout 数据：`data/timeline-events-freedom-summoning.json`（53 条）
- 已建立逐书处理日志：`data/ingestion-log.json`
- 已生成研究校对用当前总表：`exports/leeao-current-timeline.txt`
- 当前已处理《李敖自传与回忆》《李敖自传与回忆续集》《我最难忘的事和人》《李敖回忆录》《李敖快意恩仇录》《李敖议坛哀思录》《李敖风流自传》《李敖相关》《传统下的独白》《传统下的再白》《独白下的传统》《李敖文存》《李敖文存二集》《波波颂》《李敖全集》《教育与脸谱》《文化论战丹火录》《为中国思想趋向求答案》《上下古今谈》《世论新语》《求是新语》《我是天安门》《你是景福门》《为自由招魂》的增量章节；其中《你是景福门》已完成 `001-047` 目录级 closeout，《为自由招魂》也已完成第六轮 closeout。第三轮专门修正此前只做目录级覆盖、正文挖掘不足的问题；第四轮先完成重复条目清理与交叉引用补强，再继续复核 `001-012`；第五轮继续复核 `013-022`，新增 1966 年李敖写《一个最起码又最低调的标准》这一条可独立落库的旧文锚点，并补强《万岁评论》、`千秋评论28`、`文星杂志选集第三册`、警总秘密会议纪录等跨书互链；第六轮 closeout 再补入 1965 年 8 月 4 日李敖回信孙陵、明确推动《〈大风雪〉还要再查禁吗？》续稿这一条漏项，并正式确认 `019/020` 其余争议候选不再扩成新事件。其余纯法律材料、旁人履历、历史背景和音乐史材料继续暂缓，不为凑数误扩成李敖事件。

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
