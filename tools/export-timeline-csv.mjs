import fs from "node:fs";
import path from "node:path";
import { buildTimelineBundle, createTimelineBundle } from "./build-timeline-bundle.mjs";

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
  "data/timeline-events-daxue-zhaji.json",
  "data/timeline-events-zaonian-riji.json",
  "data/timeline-events-daxue-houqi-riji-jia.json",
  "data/timeline-events-daxue-houqi-riji-yi.json",
  "data/timeline-events-preofficer-diary.json",
  "data/timeline-events-li-ao-micang-diary.json",
  "data/timeline-events-li-ao-zhaji.json",
  "data/timeline-events-li-ao-wuwu-diary.json",
  "data/timeline-events-li-ao-suixielu-qianji.json",
  "data/timeline-events-li-ao-suixielu-houji.json",
  "data/timeline-events-li-ao-baokanji.json",
  "data/timeline-events-li-ao-shuxuji.json",
  "data/timeline-events-li-ao-shuxuji-xuji.json",
  "data/timeline-events-li-ao-duihualu.json",
  "data/timeline-events-li-ao-fangtanlu-1990-2018.json",
  "data/timeline-events-li-ao-qingshuji.json",
  "data/timeline-events-li-ao-shuxinji.json",
  "data/timeline-events-li-ao-shuhanji.json",
  "data/timeline-events-li-ao-shujianji.json",
  "data/timeline-events-li-ao-shuzhaji.json",
  "data/timeline-events-li-ao-shujianji-letterpaper.json",
  "data/timeline-events-li-ao-shuduji.json",
  "data/timeline-events-li-ao-shuhanji-letterbox.json",
  "data/timeline-events-li-ao-shuqiji.json",
  "data/timeline-events-prison-father-letters.json",
  "data/timeline-events-ma-ge-letters.json",
  "data/timeline-events-lishi-yu-renxiang.json",
  "data/timeline-events-dushi-zhinan.json",
  "data/timeline-events-wei-lishi-boyun.json",
  "data/timeline-events-yaoba-jinzhen-duyuren.json",
  "data/timeline-events-zhongguo-xing-yanjiu.json",
  "data/timeline-events-zhongguo-ming-yanjiu.json",
  "data/timeline-events-zhongguo-jindaishi-xinlun.json",
  "data/timeline-events-zhongguo-xiandaishi-zhenglun.json",
  "data/timeline-events-zhongguo-xiandaishi-dinglun.json",
  "data/timeline-events-zhongguo-mixin-xinyan.json",
  "data/timeline-events-zhongguo-yishu-xinyan.json",
  "data/timeline-events-li-ao-xiaoao-jianghu.json",
  "data/timeline-events-tiaozhan-li-ao.json",
  "data/timeline-events-li-ao-mimi-shufang.json",
  "data/timeline-events-li-ao-diandao-zhongsheng.json",
  "data/timeline-events-li-ao-talk-show.json",
  "data/timeline-events-li-ao-dageda.json",
  "data/timeline-events-li-ao-youhua-shuo.json",
  "data/timeline-events-xiaoao-niandai.json",
  "data/timeline-events-li-ao-yumiao-tianxia.json",
  "data/timeline-events-xiaoao-liushinian-youhua-shuo.json",
  "data/timeline-events-li-ao-yanjiangji.json",
  "data/timeline-events-li-ao-zhenglun-zongyiji.json",
  "data/timeline-events-li-ao-shenzhou-cultural-trip.json",
  "data/timeline-events-li-ao-fangdianji.json",
  "data/timeline-events-li-ao-fadianji.json",
  "data/timeline-events-li-ao-songdianji.json",
  "data/timeline-events-li-ao-laidianji.json",
  "data/timeline-events-li-ao-tongdianji.json",
  "data/timeline-events-hushi-yanjiu.json",
  "data/timeline-events-hushi-pingzhuan.json",
  "data/timeline-events-hushi-yuwo.json",
  "data/timeline-events-sunyixian-xihua-yixue.json",
  "data/timeline-events-sunzhongshan-yanjiu.json",
  "data/timeline-events-lidenghui-zhenmianmu.json",
  "data/timeline-events-lidenghui-jiamianju.json",
  "data/timeline-events-zhengnanrong-yanjiu.json",
  "data/timeline-events-chenshuibian-zhenmianmu.json",
  "data/timeline-events-liyuanzhe-zhenmianmu.json",
  "data/timeline-events-ni-buzhidao-pengmingmin.json",
  "data/timeline-events-weiwenxue-kaichuang.json",
  "data/timeline-events-chouloude-zhongguoren-yanjiu.json",
  "data/timeline-events-minbian-yanjiu-wenxing-songan.json",
  "data/timeline-events-dajiang-dahai-pianle-ni.json",
  "data/timeline-events-jiangjieshi-yanjiu.json",
  "data/timeline-events-jiangjieshi-yanjiu-xuji.json",
  "data/timeline-events-jiangjieshi-yanjiu-sanji.json",
  "data/timeline-events-jiangjieshi-yanjiu-siji.json",
  "data/timeline-events-jiangjieshi-yanjiu-wuji.json",
  "data/timeline-events-jiangjieshi-yanjiu-liuji.json",
  "data/timeline-events-jiangjieshi-zhenmianmu.json",
  "data/timeline-events-jiangjieshi-pingzhuan.json",
  "data/timeline-events-jiangjingguo-yanjiu.json",
  "data/timeline-events-lunding-jiangjingguo.json",
  "data/timeline-events-jiangjia-choushi.json",
  "data/timeline-events-li-ao-lun-renwu.json",
  "data/timeline-events-guomindang-yanjiu.json",
  "data/timeline-events-guomindang-yanjiu-xuji.json",
  "data/timeline-events-guomindang-choushi.json",
  "data/timeline-events-laozei-choushi.json",
  "data/timeline-events-gei-guomindang-nankan.json",
  "data/timeline-events-gei-waishengren-nankan.json",
  "data/timeline-events-lengyan-kan-taiwan.json",
  "data/timeline-events-baiyan-kan-taiwan.json",
  "data/timeline-events-fayan-kan-taiwan.json",
  "data/timeline-events-minjindang-yanjiu.json",
  "data/timeline-events-baise-kongbu-shuqi.json",
  "data/timeline-events-gei-taiwanren-nankan.json",
  "data/timeline-events-ni-buzhidao-228.json",
  "data/timeline-events-lingyimian-228.json",
  "data/timeline-events-xi-ni-de-nao-qia-ta-bozi.json",
  "data/timeline-events-li-ao-naoyaji.json",
  "data/timeline-events-li-ao-daobiji.json",
  "data/timeline-events-li-ao-nongfaji.json",
  "data/timeline-events-li-ao-fangdiaoji.json",
  "data/timeline-events-li-ao-haosongji.json",
  "data/timeline-events-ni-buzhidao-sifa-heian.json",
  "data/timeline-events-xiaoao-wushinian.json",
  "data/timeline-events-diyiliu-ren-de-jingjie.json",
  "data/timeline-events-li-ao-zhihuishu.json",
  "data/timeline-events-qiasi-wode-wenrou.json",
  "data/timeline-events-qifa-ni-de-xiaogushi.json",
  "data/timeline-events-junzi-airen-yise.json",
  "data/timeline-events-zhi-ai-yidian-dian.json",
  "data/timeline-events-cong-wanbao-nang-dao-choushi-dui.json",
  "data/timeline-events-women-meiyou-mingtian.json",
  "data/timeline-events-li-ao-shengsishu.json"
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
  ].join("\n");
}

const timelineData = createTimelineBundle(root);
const activeDataFiles = timelineData.dataFiles;
const events = timelineData.events.sort(compareEvents);
const rows = events.map(rowFor);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, `\uFEFF${csvFor(rows)}\n`, "utf8");

const partPaths = [];
for (let start = 0; start < rows.length; start += partSize) {
  const partNumber = String(partPaths.length + 1).padStart(2, "0");
  const partPath = path.join(outputDir, `leeao-current-timeline.part-${partNumber}.csv`);
  fs.writeFileSync(partPath, `\uFEFF${csvFor(rows.slice(start, start + partSize))}\n`, "utf8");
  partPaths.push(partPath);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  source: "exports/leeao-current-timeline.txt 的同源 JSON 数据",
  fullCsv: path.relative(root, outputPath).replaceAll("\\", "/"),
  partSize,
  partCsv: partPaths.map((file) => path.relative(root, file).replaceAll("\\", "/")),
  dataFiles: activeDataFiles,
  eventCount: rows.length,
  columns,
};
fs.writeFileSync(
  path.join(outputDir, "leeao-current-timeline.csv.manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

const timelineBundle = buildTimelineBundle(root);

console.log(JSON.stringify({ ...manifest, timelineBundle }, null, 2));
