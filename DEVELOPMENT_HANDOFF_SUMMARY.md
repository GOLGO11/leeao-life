# 李敖交互式年表接手摘要

生成日期：2026-04-24

这是一份给下一位接手者看的**精简版交接摘要**。  
它不替代 [DEVELOPMENT_HANDOFF.md](/home/aihuashanying/leeao-life/DEVELOPMENT_HANDOFF.md)，但会尽量把“现在最该记住的事”压缩到一份可以直接接手的版本。

---

## 一、当前总状态

- 项目路径：`/home/aihuashanying/leeao-life`
- 当前总事件数：**1450**
- 当前最新完成轮次：`iteration: 149`
- 当前数据版本：`2026-04-24-qiushi-xinyu-round-01`
- 当前纯文本总表：`exports/leeao-current-timeline.txt`
- 当前前端版本：
  - `app.js` 的 `dataVersion`：`2026-04-24-qiushi-xinyu-round-01`
  - `index.html` 的 CSS / JS query param：`2026-04-24-qiushi-xinyu-round-01`

当前全库校验状态：

```json
{
  "events": 1450,
  "dups": 0,
  "missingRefs": 0,
  "badDatesOrFields": 0
}
```

也就是说：

- 目前**没有坏交叉引用**
- 目前**没有重复 id**
- 目前**没有明显坏字段**

这点很重要，下一位不要把它弄回退。

---

## 二、当前最该接手的主线

### 主线书籍：`《求是新语》`

当前状态：

- **9 条**
- 刚完成**第一轮**
- 已单独建文件：  
  [data/timeline-events-qiushi-xinyu.json](/home/aihuashanying/leeao-life/data/timeline-events-qiushi-xinyu.json)

第一轮已入库章节：

- `001.钟曜唐的国文程度`
- `004.孙中山的二不`
- `005.他们都是哲学家？`
- `007.李玉阶与天命`
- `010.“伽冠哥戴”`
- `011.两种花蝴蝶`
- `012.吴大猷的无耻`
- `013.李子弋该打屁股`
- `014.李玉阶高明光大`

第一轮暂缓章节：

- `002.奴才教育与混蛋教育`
- `003.台湾哪有大事！`
- `006.毋忘李氏父子`
- `008.胡言中的真话`
- `009.这也算履历吗？`
- `015.民进党同室操“信”`

这些暂缓章不是没价值，而是：

- 要么是纯总论
- 要么只有旧年份 / 旧材料
- 要么没有可归属给本栏自身的单一当期月日锚点

### 下一步最自然怎么做

继续《求是新语》第二轮，优先扫：

- `011-020` 这一带

但继续守住同一规则：

> **只收正文直接出现、能归属给本栏自身、且没有旧年份 / 附录 / 多重竞争锚点污染的单一月日。**

---

## 三、已经阶段性收住的书

这些书当前不该再整包深挖，只适合：

- 跨书互校
- 模糊项升级
- 极少量补缝

列表如下：

- `《世论新语》`：72 条，已做整本反查与阶段性 closeout
- `《上下古今谈》`：60 条，已 closeout
- `《为中国思想趋向求答案》`：10 条，已 closeout
- `《文化论战丹火录》`：12 条，已 closeout
- `《教育与脸谱》`：19 条，已 closeout
- `《李敖全集》`：39 条，已 closeout
- `《波波颂》`：57 条，阶段性完成
- `《李敖文存》`：24 条，阶段性收束
- `《独白下的传统》`：10 条，阶段性封卷

尤其要注意：

### 《世论新语》现在不要再回到“盯尾段死磨”的老路

这本已经做过：

- 尾段推进
- keep-out 池反复复核
- 整本漏网章反查

最后一轮实际结论是：

- **安全新增已经很稀了**
- 真正危险的是把旧文日期、附录日期、引文日期误当成本栏日期

所以《世论新语》后面如需再看，优先做：

- keep-out 池说明整理
- 与别书互校
- 少量模糊项升级

不要再拿它当主线书。

---

## 四、必须保留的硬规则

这些规则是整个项目一直在遵守的，下一位不能丢：

1. **必须一本一本、章节一段一段推进**，不能一口气吞全集。
2. 年表目标是**大而全**，但只能收“李敖相关事件”。
3. **不能添加和李敖无关的旁人事件。**
4. 能精确到日就精确到日；不能确日时：
   - 用 `datePrecision`
   - 用 `displayDate`
   - 不要伪造精确日
5. 同一年排序规则：
   - 先精确到日
   - 后模糊项
6. 每条事件保留：
   - 书名
   - 章节
   - 文件路径
   - 转码后行号
7. `crossReferences` 要认真维护，但不要乱挂。
8. 最新处理的书开始，UI 里的交叉引用要显示**中文可读信息**，不要回退成英文 id。
9. 只有**真的新增事件**后，才同步这些文件：
   - [data/ingestion-log.json](/home/aihuashanying/leeao-life/data/ingestion-log.json)
   - [README.md](/home/aihuashanying/leeao-life/README.md)
   - [DEVELOPMENT_HANDOFF.md](/home/aihuashanying/leeao-life/DEVELOPMENT_HANDOFF.md)
   - [DEVELOPMENT_HANDOFF_SUMMARY.md](/home/aihuashanying/leeao-life/DEVELOPMENT_HANDOFF_SUMMARY.md)
   - [exports/leeao-current-timeline.txt](/home/aihuashanying/leeao-life/exports/leeao-current-timeline.txt)
10. 如果新增了新的数据文件，必须同时更新：
   - [app.js](/home/aihuashanying/leeao-life/app.js)
   - [tools/export-timeline-text.mjs](/home/aihuashanying/leeao-life/tools/export-timeline-text.mjs)
11. 如果本轮**没有新增**，就不要为了留痕乱改版本号或文档。

---

## 五、最重要的技术与方法坑

### 1. 文本大多是 `GB18030`

读正文时，优先这样看：

```bash
iconv -f GB18030 -t UTF-8 "<章节路径>" | nl -ba
```

### 2. “有日期”不等于“是这篇短章自己的日期”

这是整个项目最容易误收的坑。

必须先判断这个日期属于哪一类：

- 本栏正文自己的日期
- 附录署日
- 旧报 / 旧文 / 旧案日期
- 括注期号 / 转载信息
- 多重竞争锚点中的其中一个

只有第一类，或者极干净的“正文单一月日锚点”，才可以入表。

### 3. 先看有没有重复，再落条

这点在《世论新语》尾段已经踩到过：

- 有些章看起来像新条
- 实际上一查库，已经收过

所以建议每轮都先做一件事：

- 先查当前书对应 JSON 里有没有同章条目

再决定是否新增。

### 4. UI 数字和数据很容易不同步

如果你只改 JSON，不改版本号，页面可能还显示旧数。

每次有真实新增后都要同步：

- [app.js](/home/aihuashanying/leeao-life/app.js)
- [index.html](/home/aihuashanying/leeao-life/index.html)

### 5. 纯文本导出也要重刷

每次有真实新增后都要跑：

```bash
node tools/export-timeline-text.mjs
```

然后检查表头是不是对的。

---

## 六、当前建议的最小工作流

接手后建议按这个顺序走：

1. 先看工作树：

```bash
git status --short
```

2. 再看两份文档：

- [DEVELOPMENT_HANDOFF_SUMMARY.md](/home/aihuashanying/leeao-life/DEVELOPMENT_HANDOFF_SUMMARY.md)
- [DEVELOPMENT_HANDOFF.md](/home/aihuashanying/leeao-life/DEVELOPMENT_HANDOFF.md)

3. 确认当前口径仍然是：

- 总事件数：`1450`
- `《求是新语》`：`9`
- `dataVersion = 2026-04-24-qiushi-xinyu-round-01`

4. 读取目标章节时，用 `GB18030` 解码。

5. 判断候选日期属于哪类：

- 本栏自己的正文锚点
- 附录日期
- 他刊 / 旧文 / 旧案日期
- 多重竞争锚点
- 纯总论无日期

6. 只有第一类，或足够干净的“正文单一月日锚点”，才允许入表。

7. 如果没有新增，就结束，不乱改。

8. 如果有新增，再同步：

- 数据文件
- `ingestion-log`
- `README`
- 两份 handoff
- `app.js / index.html`
- 纯文本导出
- 全库校验

---

## 七、这一刻最直接的接手建议

一句话：

> **直接从《求是新语》第二轮开始，不要再回头把《世论新语》当主线。**

更具体一点：

1. 继续扫 `011-020`
2. 优先收 1989 年 10-11 月的正文单一月日
3. 暂时不要碰纯总论、旧年份回忆、附录材料
4. 保持 `missingRefs = 0`

如果只记住一件事，就记这个：

> **这项目现在最需要的，不是更激进地收，而是继续稳稳地收。**

