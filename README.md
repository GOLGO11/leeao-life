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
- 已推进第六本第九轮数据：`data/timeline-events-sixth-book.json`（105 条）
- 已建立逐书处理日志：`data/ingestion-log.json`
- 已生成研究校对用当前总表：`exports/leeao-current-timeline.txt`
- 当前已处理《李敖自传与回忆》《李敖自传与回忆续集》《我最难忘的事和人》《李敖回忆录》《李敖快意恩仇录》《李敖议坛哀思录》的部分章节，未一次性读取 163 本全集

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
