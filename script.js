const STORAGE_KEYS = {
  focus: "focus-orbit-focus-task",
  theme: "focus-orbit-theme",
  tasks: "focus-orbit-tasks",
  links: "focus-orbit-quick-links",
};

const clock = document.querySelector("#clock");
const dateDisplay = document.querySelector("#date-display");
const greeting = document.querySelector("#greeting");
const focusInput = document.querySelector("#focus-input");
const focusStatus = document.querySelector("#focus-status");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const quoteText = document.querySelector("#quote-text");
const quoteButton = document.querySelector("#quote-button");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");
const quickLinks = document.querySelector("#quick-links");
const linkForm = document.querySelector("#link-form");
const linkLabel = document.querySelector("#link-label");
const linkUrl = document.querySelector("#link-url");

const quotes = [
  "Small steps still move your orbit.",
  "Start before you feel ready.",
  "Make the next ten minutes count.",
  "Clarity grows after the first action.",
  "Your attention is a place you can choose to return to.",
];

function saveValue(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn("Focus Orbit could not save locally.", error);
    return false;
  }
}

function readValue(key, fallback = "") {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch (error) {
    console.warn("Focus Orbit could not read local data.", error);
    return fallback;
  }
}

function updateTime() {
  const now = new Date();
  const hour = now.getHours();
  const timeText = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  clock.textContent = timeText;
  clock.dateTime = now.toISOString();
  dateDisplay.textContent = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);

  if (hour < 12) greeting.textContent = "Good morning, explorer.";
  else if (hour < 18) greeting.textContent = "Good afternoon, explorer.";
  else greeting.textContent = "Good evening, explorer.";
}

function setTheme(theme) {
  const isDay = theme === "day";
  document.body.dataset.theme = isDay ? "day" : "night";
  themeIcon.textContent = isDay ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isDay ? "Switch to night theme" : "Switch to day theme");
  themeToggle.setAttribute("aria-pressed", String(isDay));
}

function setRandomQuote() {
  const currentQuote = quoteText.textContent;
  const availableQuotes = quotes.filter((quote) => quote !== currentQuote);
  quoteText.textContent = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
}

function readCollection(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch (error) {
    console.warn("Focus Orbit could not read a saved collection.", error);
    return fallback;
  }
}

function saveCollection(key, value) {
  return saveValue(key, JSON.stringify(value));
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function getTasks() {
  return readCollection(STORAGE_KEYS.tasks, []);
}

function setTasks(tasks) {
  saveCollection(STORAGE_KEYS.tasks, tasks);
  renderTasks();
}

function renderTasks() {
  const tasks = getTasks();
  const incompleteCount = tasks.filter((task) => !task.completed).length;
  taskList.replaceChildren();
  emptyState.hidden = tasks.length > 0;
  taskCount.textContent = `${incompleteCount} ${incompleteCount === 1 ? "task" : "tasks"}`;

  tasks.forEach((task) => {
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const deleteButton = document.createElement("button");

    item.className = `task-item${task.completed ? " is-done" : ""}`;
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(task.completed);
    checkbox.id = `task-${task.id}`;
    checkbox.setAttribute("aria-label", `Mark ${task.text} as ${task.completed ? "incomplete" : "complete"}`);
    checkbox.addEventListener("change", () => {
      setTasks(tasks.map((savedTask) => (
        savedTask.id === task.id ? { ...savedTask, completed: checkbox.checked } : savedTask
      )));
    });

    label.htmlFor = checkbox.id;
    label.textContent = task.text;
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
    deleteButton.addEventListener("click", () => {
      setTasks(tasks.filter((savedTask) => savedTask.id !== task.id));
    });

    item.append(checkbox, label, deleteButton);
    taskList.append(item);
  });
}

function isSafeLink(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:";
  } catch {
    return false;
  }
}

function getLinks() {
  return readCollection(STORAGE_KEYS.links, [
    { id: "calendar", label: "Calendar", url: "https://calendar.google.com" },
    { id: "classroom", label: "Classroom", url: "https://classroom.google.com" },
  ]);
}

function setLinks(links) {
  saveCollection(STORAGE_KEYS.links, links);
  renderLinks();
}

function renderLinks() {
  const links = getLinks();
  quickLinks.replaceChildren();

  links.forEach((link) => {
    const anchor = document.createElement("a");
    const label = document.createElement("span");
    const arrow = document.createElement("span");

    anchor.className = "quick-link";
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    label.textContent = link.label;
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");
    anchor.append(label, arrow);
    quickLinks.append(anchor);
  });
}

function initialiseCore() {
  focusInput.value = readValue(STORAGE_KEYS.focus);
  setTheme(readValue(STORAGE_KEYS.theme, "night"));
  updateTime();
  window.setInterval(updateTime, 1000);
  renderTasks();
  renderLinks();
}

function saveFocusTask() {
  const wasSaved = saveValue(STORAGE_KEYS.focus, focusInput.value.trim());
  focusStatus.textContent = wasSaved ? "Saved in this browser." : "Saving is blocked by this browser.";
}

focusInput.addEventListener("input", saveFocusTask);
focusInput.addEventListener("change", saveFocusTask);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "day" ? "night" : "day";
  setTheme(nextTheme);
  saveValue(STORAGE_KEYS.theme, nextTheme);
});

quoteButton.addEventListener("click", setRandomQuote);

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  setTasks([...getTasks(), { id: createId(), text, completed: false }]);
  taskForm.reset();
  taskInput.focus();
});

linkForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const label = linkLabel.value.trim();
  const url = linkUrl.value.trim();

  if (!label || !isSafeLink(url)) {
    linkUrl.setCustomValidity("Enter a full http:// or https:// address.");
    linkUrl.reportValidity();
    return;
  }

  linkUrl.setCustomValidity("");
  setLinks([...getLinks(), { id: createId(), label, url }]);
  linkForm.reset();
  linkLabel.focus();
});

linkUrl.addEventListener("input", () => linkUrl.setCustomValidity(""));

initialiseCore();
