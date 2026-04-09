// ==UserScript==
// @name         Time tracker
// @namespace    http://tampermonkey.net/
// @version      2026-04-09
// @description  try to take over the world!
// @author       You
// @match        https://gitlab.greendatasoft.ru/greendata/greendata-core/-/issues/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greendatasoft.ru
// @grant        none
// ==/UserScript==
(function () {
  const STORAGE_KEY = "gitlab-time-tracker";

  function getIssueId() {
    return window.location.pathname;
  }

  function loadData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function formatTime(ms) {
    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  function createUI(container) {
    const issueId = getIssueId();
    const data = loadData();

    if (!data[issueId]) {
      data[issueId] = { start: null, elapsed: 0 };
    }

    const wrapper = document.createElement("div");
    wrapper.style.marginTop = "8px";

    const display = document.createElement("span");
    display.style.marginRight = "10px";

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start";

    const stopBtn = document.createElement("button");
    stopBtn.textContent = "Stop";
    stopBtn.style.marginLeft = "5px";

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    resetBtn.style.marginLeft = "5px";

    wrapper.appendChild(display);
    wrapper.appendChild(startBtn);
    wrapper.appendChild(stopBtn);
    wrapper.appendChild(resetBtn);
    container.appendChild(wrapper);

    function updateDisplay() {
      const entry = data[issueId];
      let elapsed = entry.elapsed;

      if (entry.start) {
        elapsed += Date.now() - entry.start;
        startBtn.style.backgroundColor = "#4caf50"; // highlight
        startBtn.style.color = "white";
      } else {
        startBtn.style.backgroundColor = "";
        startBtn.style.color = "";
      }

      display.textContent = `⏱ ${formatTime(elapsed)}`;
    }

    startBtn.onclick = () => {
      const entry = data[issueId];
      if (!entry.start) {
        entry.start = Date.now();
        saveData(data);
        updateDisplay();
      }
    };

    stopBtn.onclick = () => {
      const entry = data[issueId];
      if (entry.start) {
        entry.elapsed += Date.now() - entry.start;
        entry.start = null;
        saveData(data);
        updateDisplay();
      }
    };

    resetBtn.onclick = () => {
      data[issueId] = { start: null, elapsed: 0 };
      saveData(data);
      updateDisplay();
    };

    setInterval(updateDisplay, 1000);
    updateDisplay();
  }

  function init() {
    const target = document.querySelector(
      '[data-testid="work-item-time-tracking"]'
    );

    if (target && !target.dataset.customTimerAttached) {
      target.dataset.customTimerAttached = "true";
      createUI(target);
    }
  }

  const observer = new MutationObserver(init);
  observer.observe(document.body, { childList: true, subtree: true });

  init();
})();
