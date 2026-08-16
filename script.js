const STORAGE_KEYS = {
  focus: "focus-orbit-focus-task",
  theme: "focus-orbit-theme",
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

function initialiseCore() {
  focusInput.value = readValue(STORAGE_KEYS.focus);
  setTheme(readValue(STORAGE_KEYS.theme, "night"));
  updateTime();
  window.setInterval(updateTime, 1000);
}

focusInput.addEventListener("input", () => {
  const wasSaved = saveValue(STORAGE_KEYS.focus, focusInput.value.trim());
  focusStatus.textContent = wasSaved ? "Saved in this browser." : "Saving is blocked by this browser.";
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "day" ? "night" : "day";
  setTheme(nextTheme);
  saveValue(STORAGE_KEYS.theme, nextTheme);
});

quoteButton.addEventListener("click", setRandomQuote);

initialiseCore();
