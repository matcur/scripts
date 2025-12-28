// ==UserScript==
// @name         Block YouTube on Workdays (10am–8pm)
// @namespace    https://tampermonkey.net/
// @version      1.1
// @description  Blocks YouTube on weekdays from 10:00 AM to 8:00 PM
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const BLOCK_START = 10; // 10 AM
    const BLOCK_END = 18;   // 6 PM
    const REDIRECT_URL = 'about:blank';

    function isWorkday() {
        const day = new Date().getDay();
        // 1 = Monday, 5 = Friday
        return day >= 1 && day <= 5;
    }

    function isBlockedTime() {
        const now = new Date();
        const hour = now.getHours();
        return isWorkday() && hour >= BLOCK_START && hour < BLOCK_END;
    }

    function enforceBlock() {
        if (isBlockedTime()) {
            location.replace(REDIRECT_URL);
            return;
        }
        setTimeout(enforceBlock, 1000);
    }

    enforceBlock();
})();
