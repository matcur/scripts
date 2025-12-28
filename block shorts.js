// ==UserScript==
// @name         Block YouTube Shorts (Timer)
// @namespace    https://tampermonkey.net/
// @version      1.0
// @description  Redirect away from YouTube Shorts using a 1s timer
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const REDIRECT_URL = 'https://www.youtube.com/';

    function checkShorts() {
        if (location.pathname.startsWith('/shorts')) {
            location.replace(REDIRECT_URL);
            return;
        }
        setTimeout(checkShorts, 1000);
    }

    checkShorts();
})();
