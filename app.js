const state = {
  events: [],
  log: [],
  view: "all",
  decade: "all",
  year: "all",
  query: "",
  sort: "asc",
  renderedLimit: 240,
  filteredEvents: [],
  eventIndex: new Map(),
  decadeCounts: new Map()
};

const initialRenderLimit = 240;
const renderBatchSize = 240;
const searchDebounceMs = 120;
let searchTimer = 0;

const viewFilter = document.querySelector("#viewFilter");
const yearFilter = document.querySelector("#yearFilter");
const searchInput = document.querySelector("#searchInput");
const sortOrder = document.querySelector("#sortOrder");
const timelineList = document.querySelector("#timelineList");
const decadeNav = document.querySelector("#decadeNav");
const eventCount = document.querySelector("#eventCount");
const rangeLabel = document.querySelector("#rangeLabel");
const bookCount = document.querySelector("#bookCount");
const resultLabel = document.querySelector("#resultLabel");
const loadMore = document.querySelector("#loadMore");
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
  "./data/timeline-events-seventh-book.json",
  "./data/timeline-events-eighth-book.json",
  "./data/timeline-events-traditional-monologue.json",
  "./data/timeline-events-traditional-monologue-sequel.json",
  "./data/timeline-events-monologue-under-tradition.json",
  "./data/timeline-events-wencun.json",
  "./data/timeline-events-wencun-two.json",
  "./data/timeline-events-bobo-song.json",
  "./data/timeline-events-li-ao-complete-works.json",
  "./data/timeline-events-education-and-faces.json",
  "./data/timeline-events-cultural-debate-danhuo.json",
  "./data/timeline-events-thought-trend-answer.json",
  "./data/timeline-events-shangxia-gujin-talks.json",
  "./data/timeline-events-shilun-xinyu.json",
  "./data/timeline-events-qiushi-xinyu.json",
  "./data/timeline-events-woshi-tiananmen.json",
  "./data/timeline-events-jingfumen.json",
  "./data/timeline-events-freedom-summoning.json",
  "./data/timeline-events-ni-bendan.json",
  "./data/timeline-events-dream-awake.json",
  "./data/timeline-events-li-ao-xinkan.json",
  "./data/timeline-events-qianqiu-wansui-wuya-qiushi.json",
  "./data/timeline-events-li-ao-zawenji.json",
  "./data/timeline-events-qianqiu-wansui-bianwai.json",
  "./data/timeline-events-beijing-fayuansi.json",
  "./data/timeline-events-shangshan-ai.json",
  "./data/timeline-events-red-11.json",
  "./data/timeline-events-virtual-seventeen.json",
  "./data/timeline-events-yangwei-america.json",
  "./data/timeline-events-73rd-martyr.json",
  "./data/timeline-events-love-secret.json",
  "./data/timeline-events-li-ao-love-poems.json",
  "./data/timeline-events-li-yulu.json",
  "./data/timeline-events-li-ao-yulu.json",
  "./data/timeline-events-sui-qianwan-li-ao-wangyi.json",
  "./data/timeline-events-tiaozhan-li-ao-ao-yulu.json",
  "./data/timeline-events-daxue-zhaji.json",
  "./data/timeline-events-zaonian-riji.json",
  "./data/timeline-events-daxue-houqi-riji-jia.json",
  "./data/timeline-events-daxue-houqi-riji-yi.json",
  "./data/timeline-events-preofficer-diary.json"
];
const supplementalDataFiles = new Set([
  "./data/timeline-events-first-book-supplement.json",
  "./data/timeline-events-first-book-broad.json",
  "./data/timeline-events-first-book-daily.json",
  "./data/timeline-events-second-book-broad.json",
  "./data/timeline-events-second-book-evidence.json",
  "./data/timeline-events-third-book-qiao-evidence.json",
  "./data/timeline-events-fourth-book-deepening.json"
]);
const processedBookCount = dataFiles.filter((file) => !supplementalDataFiles.has(file)).length;
const dataVersion = "2026-05-09-preofficer-diary-june-1960-round168-june1-june2";

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

function crossReferenceLabel(id) {
  const linked = state.eventIndex.get(id);
  if (!linked) {
    return id;
  }
  return `${dateLabel(linked)}《${linked.title}》`;
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
  if (event.searchText) {
    return event.searchText;
  }

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
    .filter((event) => state.year === "all" || yearOf(event) === state.year)
    .filter((event) => !query || searchableText(event).includes(query))
    .sort((a, b) => compareEvents(a, b, state.sort));
}

function resetRenderedLimit() {
  state.renderedLimit = initialRenderLimit;
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
  const years = unique(state.events.map(yearOf));
  for (const year of years) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `${year}年`;
    yearFilter.append(option);
  }

  for (const decade of decades) {
    state.decadeCounts.set(decade, state.events.filter((event) => decadeOf(event) === decade).length);
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
    state.year = "all";
    yearFilter.value = "all";
    resetRenderedLimit();
    render();
  });
  decadeNav.append(allButton);

  for (const decade of decades) {
    const count = state.decadeCounts.get(decade) || 0;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${decade}年代 · ${count}`;
    button.className = state.decade === decade ? "active" : "";
    button.addEventListener("click", () => {
      state.decade = decade;
      state.year = "all";
      yearFilter.value = "all";
      resetRenderedLimit();
      render();
    });
    decadeNav.append(button);
  }
}

function renderStats(events) {
  eventCount.textContent = String(state.events.length);
  bookCount.textContent = String(processedBookCount);
  if (!events.length) {
    rangeLabel.textContent = "-";
    resultLabel.textContent = "没有匹配事件";
    return;
  }
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  rangeLabel.textContent = `${sorted[0].date.slice(0, 4)}-${sorted.at(-1).date.slice(0, 4)}`;
  const shown = Math.min(events.length, state.renderedLimit);
  resultLabel.textContent = `当前显示 ${shown}/${events.length} 条，已载入 ${state.events.length} 条，数据版本 ${dataVersion}`;
}

function renderTimeline(events) {
  const visibleEvents = events.slice(0, state.renderedLimit);
  const fragment = document.createDocumentFragment();
  timelineList.replaceChildren();
  for (const event of visibleEvents) {
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
    fragment.append(item);
  }
  timelineList.append(fragment);
  loadMore.hidden = events.length <= state.renderedLimit;
  loadMore.textContent = `加载更多（余 ${Math.max(events.length - state.renderedLimit, 0)} 条）`;
}

function openEvent(event) {
  const crossReferences = event.crossReferences?.length
    ? `<p class="dialog-source">交叉引用：${event.crossReferences.map(crossReferenceLabel).join("；")}</p>`
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
  state.filteredEvents = events;
  renderStats(events);
  renderTimeline(events);
  renderDecadeNav(unique(state.events.map(decadeOf)));
}

async function boot() {
  const [eventGroups, logResponse] = await Promise.all([
    Promise.all(dataFiles.map((file) => fetch(`${file}?v=${dataVersion}`).then((response) => response.json()))),
    fetch(`./data/ingestion-log.json?v=${dataVersion}`)
  ]);
  state.events = eventGroups.flat();
  for (const event of state.events) {
    event.searchText = searchableText(event);
  }
  state.eventIndex = new Map(state.events.map((event) => [event.id, event]));
  state.log = await logResponse.json();
  populateFilters();
  render();
}

viewFilter.addEventListener("change", (event) => {
  state.view = event.target.value;
  resetRenderedLimit();
  render();
});

yearFilter.addEventListener("change", (event) => {
  state.year = event.target.value;
  state.decade = "all";
  resetRenderedLimit();
  render();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  resetRenderedLimit();
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(render, searchDebounceMs);
});

sortOrder.addEventListener("change", (event) => {
  state.sort = event.target.value;
  resetRenderedLimit();
  render();
});

loadMore.addEventListener("click", () => {
  state.renderedLimit += renderBatchSize;
  renderStats(state.filteredEvents);
  renderTimeline(state.filteredEvents);
});

closeDialog.addEventListener("click", () => dialog.close());

boot().catch((error) => {
  resultLabel.textContent = "载入失败";
  console.error(error);
});
