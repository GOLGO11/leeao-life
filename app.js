const state = {
  events: [],
  log: [],
  view: "all",
  decade: "all",
  query: "",
  sort: "asc"
};

const viewFilter = document.querySelector("#viewFilter");
const decadeFilter = document.querySelector("#decadeFilter");
const searchInput = document.querySelector("#searchInput");
const sortOrder = document.querySelector("#sortOrder");
const timelineList = document.querySelector("#timelineList");
const decadeNav = document.querySelector("#decadeNav");
const eventCount = document.querySelector("#eventCount");
const rangeLabel = document.querySelector("#rangeLabel");
const bookCount = document.querySelector("#bookCount");
const resultLabel = document.querySelector("#resultLabel");
const dialog = document.querySelector("#eventDialog");
const dialogBody = document.querySelector("#dialogBody");
const closeDialog = document.querySelector("#closeDialog");

const dataFiles = [
  "./data/timeline-events.json",
  "./data/timeline-events-first-book-supplement.json",
  "./data/timeline-events-first-book-broad.json",
  "./data/timeline-events-first-book-daily.json",
  "./data/timeline-events-second-book.json",
  "./data/timeline-events-second-book-broad.json",
  "./data/timeline-events-second-book-evidence.json",
  "./data/timeline-events-third-book.json",
  "./data/timeline-events-third-book-qiao-evidence.json",
  "./data/timeline-events-fourth-book.json",
  "./data/timeline-events-fourth-book-deepening.json",
  "./data/timeline-events-fifth-book.json",
  "./data/timeline-events-sixth-book.json",
  "./data/timeline-events-seventh-book.json"
];
const dataVersion = "2026-04-22-seventh-round-16";

const dateFormatter = new Intl.DateTimeFormat("zh-Hant", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatDate(value) {
  return dateFormatter.format(parseDate(value));
}

function dateLabel(event) {
  return event.displayDate || formatDate(event.date);
}

function decadeOf(event) {
  return `${event.date.slice(0, 3)}0`;
}

function yearOf(event) {
  return event.date.slice(0, 4);
}

function isDayPrecise(event) {
  return !event.datePrecision || event.datePrecision === "day";
}

function compareEvents(a, b, direction = "asc") {
  const yearResult = yearOf(a).localeCompare(yearOf(b));
  if (yearResult) {
    return direction === "asc" ? yearResult : -yearResult;
  }

  const precisionResult = Number(!isDayPrecise(a)) - Number(!isDayPrecise(b));
  if (precisionResult) {
    return precisionResult;
  }

  const dateResult = a.date.localeCompare(b.date);
  if (dateResult) {
    return direction === "asc" ? dateResult : -dateResult;
  }

  return a.title.localeCompare(b.title, "zh-Hant");
}

function unique(items) {
  return [...new Set(items)].sort((a, b) => a.localeCompare(b, "zh-Hant"));
}

function searchableText(event) {
  return [
    event.date,
    event.title,
    event.summary,
    ...(event.tags || []),
    ...(event.people || []),
    ...(event.places || []),
    ...(event.works || []),
    ...(event.view || [])
  ]
    .join(" ")
    .toLowerCase();
}

function filteredEvents() {
  const query = state.query.trim().toLowerCase();
  return state.events
    .filter((event) => state.view === "all" || event.view.includes(state.view))
    .filter((event) => state.decade === "all" || decadeOf(event) === state.decade)
    .filter((event) => !query || searchableText(event).includes(query))
    .sort((a, b) => compareEvents(a, b, state.sort));
}

function populateFilters() {
  const views = unique(state.events.flatMap((event) => event.view));
  for (const view of views) {
    const option = document.createElement("option");
    option.value = view;
    option.textContent = view;
    viewFilter.append(option);
  }

  const decades = unique(state.events.map(decadeOf));
  for (const decade of decades) {
    const option = document.createElement("option");
    option.value = decade;
    option.textContent = `${decade}年代`;
    decadeFilter.append(option);
  }

  renderDecadeNav(decades);
}

function renderDecadeNav(decades) {
  decadeNav.replaceChildren();
  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.textContent = "全部";
  allButton.className = state.decade === "all" ? "active" : "";
  allButton.addEventListener("click", () => {
    state.decade = "all";
    decadeFilter.value = "all";
    render();
  });
  decadeNav.append(allButton);

  for (const decade of decades) {
    const count = state.events.filter((event) => decadeOf(event) === decade).length;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${decade}年代 · ${count}`;
    button.className = state.decade === decade ? "active" : "";
    button.addEventListener("click", () => {
      state.decade = decade;
      decadeFilter.value = decade;
      render();
    });
    decadeNav.append(button);
  }
}

function renderStats(events) {
  eventCount.textContent = String(state.events.length);
  bookCount.textContent = String(unique(state.events.map((event) => event.source.book)).length);
  if (!events.length) {
    rangeLabel.textContent = "-";
    resultLabel.textContent = "没有匹配事件";
    return;
  }
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  rangeLabel.textContent = `${sorted[0].date.slice(0, 4)}-${sorted.at(-1).date.slice(0, 4)}`;
  resultLabel.textContent = `当前显示 ${events.length} 条，已载入 ${state.events.length} 条，数据版本 ${dataVersion}`;
}

function renderTimeline(events) {
  timelineList.replaceChildren();
  for (const event of events) {
    const item = document.createElement("li");
    item.className = "event";
    item.id = event.id;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "event-card";
    button.innerHTML = `
      <span class="event-date">${dateLabel(event)}</span>
      <strong class="event-title">${event.title}</strong>
      <p class="event-summary">${event.summary}</p>
      <span class="chips">${event.view.map((view) => `<span class="chip">${view}</span>`).join("")}</span>
    `;
    button.addEventListener("click", () => openEvent(event));
    item.append(button);
    timelineList.append(item);
  }
}

function openEvent(event) {
  const crossReferences = event.crossReferences?.length
    ? `<p class="dialog-source">交叉引用：${event.crossReferences.join("、")}</p>`
    : "";
  const additionalSources = event.additionalSources?.length
    ? `<p class="dialog-source">补充来源：${event.additionalSources
        .map((source) => `${source.book} / ${source.chapter} / line ${source.line}`)
        .join("；")}</p>`
    : "";
  dialogBody.innerHTML = `
    <p class="dialog-date">${dateLabel(event)}</p>
    <h2>${event.title}</h2>
    <p>${event.summary}</p>
    <div class="chips">
      ${event.datePrecision && event.datePrecision !== "day" ? `<span class="chip">待校日</span>` : ""}
      ${(event.tags || []).map((tag) => `<span class="chip">${tag}</span>`).join("")}
    </div>
    <p class="dialog-source">
      出处：${event.source.book} / ${event.source.chapter}<br>
      文件：${event.source.path}<br>
      转码后行号：${event.source.line}
    </p>
    ${additionalSources}
    ${crossReferences}
  `;
  dialog.showModal();
}

function render() {
  const events = filteredEvents();
  renderStats(events);
  renderTimeline(events);
  renderDecadeNav(unique(state.events.map(decadeOf)));
}

async function boot() {
  const [eventGroups, logResponse] = await Promise.all([
    Promise.all(dataFiles.map((file) => fetch(`${file}?v=${dataVersion}`, { cache: "no-store" }).then((response) => response.json()))),
    fetch(`./data/ingestion-log.json?v=${dataVersion}`, { cache: "no-store" })
  ]);
  state.events = eventGroups.flat();
  state.log = await logResponse.json();
  populateFilters();
  render();
}

viewFilter.addEventListener("change", (event) => {
  state.view = event.target.value;
  render();
});

decadeFilter.addEventListener("change", (event) => {
  state.decade = event.target.value;
  render();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

sortOrder.addEventListener("change", (event) => {
  state.sort = event.target.value;
  render();
});

closeDialog.addEventListener("click", () => dialog.close());

boot().catch((error) => {
  resultLabel.textContent = "载入失败";
  console.error(error);
});
