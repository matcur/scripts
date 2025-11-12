// ==UserScript==
// @name         Merges
// @namespace    http://tampermonkey.net/
// @version      2025-09-03
// @description  try to take over the world!
// @author       You
// @match        https://gitlab.greendatasoft.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greendatasoft.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

      const mergeBtn = document.createElement("button")
      mergeBtn.style.position = "fixed"
      mergeBtn.style.top = "8px"
      mergeBtn.style.right = "20px"
      mergeBtn.addEventListener("click", () => {
           document.querySelector("#developmentitems").scrollIntoView({block: "center"})
      })
      mergeBtn.innerText = "Merges"
      mergeBtn.style.zIndex = 10000
      document.body.appendChild(mergeBtn)

      const commentBtn = document.createElement("button")
      commentBtn.style.position = "fixed"
      commentBtn.style.top = "8px"
      commentBtn.style.right = "110px"
      commentBtn.style.zIndex = 10000
      commentBtn.addEventListener("click", () => {
        const id = window.location.hash.substring(1);
        if (id) {
          const el = document.getElementById(id);
          if (el) {
            // Scroll into view smoothly
            el.scrollIntoView({block: "center" });
          }
        }
      })
      commentBtn.innerText = "Comment"
      document.body.appendChild(commentBtn)
    // Your code here...
})();
