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
  "data/timeline-events-sixth-book.json",
  "data/timeline-events-seventh-book.json",
  "data/timeline-events-eighth-book.json",
  "data/timeline-events-traditional-monologue.json",
  "data/timeline-events-traditional-monologue-sequel.json",
  "data/timeline-events-monologue-under-tradition.json",
  "data/timeline-events-wencun.json",
  "data/timeline-events-wencun-two.json",
  "data/timeline-events-bobo-song.json",
  "data/timeline-events-li-ao-complete-works.json",
  "data/timeline-events-education-and-faces.json",
  "data/timeline-events-cultural-debate-danhuo.json",
  "data/timeline-events-thought-trend-answer.json",
  "data/timeline-events-shangxia-gujin-talks.json",
  "data/timeline-events-shilun-xinyu.json",
  "data/timeline-events-qiushi-xinyu.json",
  "data/timeline-events-woshi-tiananmen.json",
  "data/timeline-events-jingfumen.json",
  "data/timeline-events-freedom-summoning.json",
  "data/timeline-events-ni-bendan.json",
  "data/timeline-events-dream-awake.json",
  "data/timeline-events-li-ao-xinkan.json",
  "data/timeline-events-qianqiu-wansui-wuya-qiushi.json",
  "data/timeline-events-li-ao-zawenji.json",
  "data/timeline-events-qianqiu-wansui-bianwai.json",
  "data/timeline-events-beijing-fayuansi.json",
  "data/timeline-events-shangshan-ai.json",
  "data/timeline-events-red-11.json",
  "data/timeline-events-virtual-seventeen.json",
  "data/timeline-events-yangwei-america.json",
  "data/timeline-events-73rd-martyr.json",
  "data/timeline-events-love-secret.json",
  "data/timeline-events-li-ao-love-poems.json",
  "data/timeline-events-li-yulu.json",
  "data/timeline-events-li-ao-yulu.json",
  "data/timeline-events-sui-qianwan-li-ao-wangyi.json",
  "data/timeline-events-tiaozhan-li-ao-ao-yulu.json",
];

const outputDir = path.join(root, "exports");
const outputPath = path.join(outputDir, "leeao-current-timeline.csv");
const partSize = 1000;

const columns = [
  "row",
  "year",
  "date",
  "displayDate",
  "datePrecision",
  "certainty",
  "title",
  "summary",
  "people",
  "places",
  "tags",
  "view",
  "works",
  "crossReferences",
  "sourceBook",
  "sourceChapter",
  "sourceLine",
  "sourcePath",
  "additionalSources",
  "additionalSourcesJson",
  "dataFile",
  "id",
  "eventJson",
];

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
  if (yearResult) return yearResult;

  const precisionResult = Number(!isDayPrecise(a)) - Number(!isDayPrecise(b));
  if (precisionResult) return precisionResult;

  return (
    a.date.localeCompare(b.date) ||
    label(a).localeCompare(label(b), "zh-Hant") ||
    a.title.localeCompare(b.title, "zh-Hant")
  );
}

function oneLine(value) {
  return String(value ?? "")
    .replace(/\r\n/g, "\\n")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\n");
}

function csvCell(value) {
  const text = oneLine(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function list(value) {
  return Array.isArray(value) ? value.join("、") : "";
}

function sourceLabel(source) {
  if (!source) return "";
  const parts = [
    source.book,
    source.chapter,
    source.line ? `line ${source.line}` : "",
    source.note ? `说明：${source.note}` : "",
    source.path,
  ].filter(Boolean);
  return parts.join(" / ");
}

function rowFor(event, index) {
  const additionalSources = event.additionalSources || [];
  return {
    row: index + 1,
    year: event.date.slice(0, 4),
    date: event.date,
    displayDate: label(event),
    datePrecision: precisionLabel(event),
    certainty: event.certainty || "",
    title: event.title,
    summary: event.summary,
    people: list(event.people),
    places: list(event.places),
    tags: list(event.tags),
    view: list(event.view),
    works: list(event.works),
    crossReferences: list(event.crossReferences),
    sourceBook: event.source?.book || "",
    sourceChapter: event.source?.chapter || "",
    sourceLine: event.source?.line || "",
    sourcePath: event.source?.path || "",
    additionalSources: additionalSources.map(sourceLabel).join(" || "),
    additionalSourcesJson: JSON.stringify(additionalSources),
    dataFile: event.dataFile,
    id: event.id,
    eventJson: JSON.stringify(event),
  };
}

function csvFor(rows) {
  return [
    columns.map(csvCell).join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(",")),
  ].join("\r\n");
}

const events = dataFiles
  .flatMap((file) => readJson(file).map((event) => ({ ...event, dataFile: file })))
  .sort(compareEvents);
const rows = events.map(rowFor);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, `\uFEFF${csvFor(rows)}\r\n`, "utf8");

const partPaths = [];
for (let start = 0; start < rows.length; start += partSize) {
  const partNumber = String(partPaths.length + 1).padStart(2, "0");
  const partPath = path.join(outputDir, `leeao-current-timeline.part-${partNumber}.csv`);
  fs.writeFileSync(partPath, `\uFEFF${csvFor(rows.slice(start, start + partSize))}\r\n`, "utf8");
  partPaths.push(partPath);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  source: "exports/leeao-current-timeline.txt 的同源 JSON 数据",
  fullCsv: path.relative(root, outputPath).replaceAll("\\", "/"),
  partSize,
  partCsv: partPaths.map((file) => path.relative(root, file).replaceAll("\\", "/")),
  dataFiles,
  eventCount: rows.length,
  columns,
};
fs.writeFileSync(
  path.join(outputDir, "leeao-current-timeline.csv.manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(manifest, null, 2));
