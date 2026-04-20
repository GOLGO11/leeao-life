import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { TextDecoder } from "node:util";

const decoder = new TextDecoder("gb18030");
const datePattern = /(\d{4}年\d{1,2}月\d{1,2}日|\d{4}年\d{1,2}月|\d{4}年|\d{1,2}月\d{1,2}日|民国[一二三四五六七八九十百〇零\d]+年)/g;

process.stdout.on("error", (error) => {
  if (error.code === "EPIPE") process.exit(0);
  throw error;
});

async function listTextFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".txt"))
    .map((entry) => path.join(root, entry.name))
    .sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}

async function main() {
  const root = process.argv[2];
  if (!root) {
    console.error("用法：node tools/find-dated-lines.mjs <单本书目录>");
    process.exitCode = 1;
    return;
  }

  const files = await listTextFiles(root);
  for (const file of files) {
    const text = decoder.decode(await readFile(file));
    const lines = text.split(/\r?\n/);
    let printedHeader = false;

    lines.forEach((line, index) => {
      const matches = line.match(datePattern);
      if (!matches) return;
      if (!printedHeader) {
        console.log(`\n### ${path.basename(file)}`);
        printedHeader = true;
      }
      const excerpt = line.trim().replace(/\s+/g, " ").slice(0, 220);
      console.log(`${index + 1}: ${matches.join("、")} ｜ ${excerpt}`);
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
