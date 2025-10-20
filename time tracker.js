// ==UserScript==
// @name         The time tracker
// @namespace    http://tampermonkey.net/
// @version      2025-10-20
// @description  try to take over the world!
// @author       You
// @match       https://gitlab.greendatasoft.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gitlab.com
// @grant        none
// ==/UserScript==

(function() {
    if (!localStorage.getItem("tracks")) {
        localStorage.setItem("tracks", "[]")
    }

    function normalizeDateItem(item) {
        return item.padStart(2, "0")
    }
    function formatDate(date, format = "YYYY-MM-DD") {
        if (typeof date === "string") {
            date = new Date(date)
        }
        const map = {
            DD: normalizeDateItem(String(date.getDate())),
            MM: normalizeDateItem(String(date.getMonth() + 1)), // months are 0-based
            YYYY: date.getFullYear(),
            HH: normalizeDateItem(String(date.getHours())),
            mm: normalizeDateItem(String(date.getMinutes())),
            ss: normalizeDateItem(String(date.getSeconds())),
        };

        return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => map[match]);
    }
    'use strict';
    let leButton = null
    let time = ""
    function addTrack() {
        leButton = null
        localStorage.setItem("tracks", JSON.stringify([...JSON.parse(localStorage.getItem("tracks")), {href: location.href, time, date: formatDate(document.querySelector(`[data-testid="gl-datepicker-input"]`)?.value || new Date())}]))
        time = ""
        setTimeout(track, 5000)
    }
    setInterval(() => {
         if (document.querySelector("#time-spent")?.value?.trim?.()) {
             time = document.querySelector("#time-spent")?.value?.trim?.() || ""
         }
    }, 200)
     function track() {
         if (!Array.from(document.querySelectorAll('h2')).find(b => b.textContent.includes('Add time entry')) || leButton) {
             return setTimeout(track, 500)
         }
         leButton = document.querySelector(".modal-dialog").querySelector(".js-modal-action-primary")
         if (leButton) {
             return leButton.addEventListener("click", addTrack)
         }
         setTimeout(track, 500)
     }
    track()
    // Your code here...
})();
