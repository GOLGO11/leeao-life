import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataFiles = [
  "data/timeline-events.json",
  "data/timeline-events-first-book-supplement.json",
  "data/timeline-events-first-book-broad.json",
  "data/timeline-events-first-book-daily.json",
  "data/timeline-events-second-book.json",
  "data/timeline-events-second-book-broad.json",
  "data/timeline-events-second-book-evidence.json",
  "data/timeline-events-third-book.json",
  "data/timeline-events-third-book-qiao-evidence.json",
  "data/timeline-events-fourth-book.json",
  "data/timeline-events-fourth-book-deepening.json",
  "data/timeline-events-fifth-book.json",
  "data/timeline-events-sixth-book.json"
];
const outputPath = path.join(root, "exports", "leeao-current-timeline.txt");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function label(event) {
  return event.displayDate || event.date;
}

function precisionLabel(event) {
  return event.datePrecision || "day";
}

function isDayPrecise(event) {
  return precisionLabel(event) === "day";
}

function compareEvents(a, b) {
  const yearResult = a.date.slice(0, 4).localeCompare(b.date.slice(0, 4));
  if (yearResult) {
    return yearResult;
  }

  const precisionResult = Number(!isDayPrecise(a)) - Number(!isDayPrecise(b));
  if (precisionResult) {
    return precisionResult;
  }

  return a.date.localeCompare(b.date) || label(a).localeCompare(label(b), "zh-Hant") || a.title.localeCompare(b.title, "zh-Hant");
}

function sourceLine(event) {
  return `${event.source.book} / ${event.source.chapter} / line ${event.source.line}`;
}

const events = dataFiles
  .flatMap((file) => readJson(file).map((event) => ({ ...event, dataFile: file })))
  .sort(compareEvents);

const precisionCounts = events.reduce((counts, event) => {
  const key = precisionLabel(event);
  counts[key] = (counts[key] || 0) + 1;
  return counts;
}, {});

const lines = [
  "李敖交互式年表：当前增量纯文本备份",
  `生成日期：${new Date().toISOString().slice(0, 10)}`,
  `事件总数：${events.length}`,
  `数据文件：${dataFiles.join("；")}`,
  "说明：date 是机器排序用日期；displayDate 保留原文日期形态。datePrecision 非 day 的条目均需后续人工校日；同一年内先列精确到日条目，再列模糊时间条目。",
  `日期精度统计：${Object.entries(precisionCounts).map(([key, value]) => `${key}=${value}`).join("；")}`,
  ""
];

let currentYear = "";
for (const event of events) {
  const year = event.date.slice(0, 4);
  if (year !== currentYear) {
    currentYear = year;
    lines.push(`\n${year}`);
  }
  lines.push(`- ${label(event)} | ${event.title}`);
  lines.push(`  精度：${precisionLabel(event)}；可靠度：${event.certainty}；排序日期：${event.date}`);
  lines.push(`  摘要：${event.summary}`);
  lines.push(`  人物：${(event.people || []).join("、") || "-"}`);
  lines.push(`  地点：${(event.places || []).join("、") || "-"}`);
  lines.push(`  标签：${(event.tags || []).join("、") || "-"}`);
  lines.push(`  视图：${(event.view || []).join("、") || "-"}`);
  lines.push(`  作品：${(event.works || []).join("、") || "-"}`);
  lines.push(`  交叉引用：${(event.crossReferences || []).join("、") || "-"}`);
  lines.push(`  来源：${sourceLine(event)}`);
  lines.push(`  文件：${event.source.path}`);
  lines.push(`  数据：${event.dataFile}#${event.id}`);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");

console.log(outputPath);
