// ==UserScript==
// @name         Select the branch
// @namespace    http://tampermonkey.net/
// @version      2025-09-03
// @description  try to take over the world!
// @author       You
// @match        https://gitlab.greendatasoft.ru/*/-/merge_requests/new?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greendatasoft.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const url = window.location.href; // use current page URL
    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);

    // check if target_branch already exists
    if (!params.has("merge_request[target_branch]")) {
        // get source branch
        const sourceBranch = params.get("merge_request[source_branch]");
        if (sourceBranch) {
            // take part after last "/"
            const afterSlash = sourceBranch.split("/").pop();

            // add new param
            params.set("merge_request[target_branch]", afterSlash);

            // update URL
            parsedUrl.search = params.toString();

            // redirect
            window.location.href = parsedUrl.toString();
        }
    }
    // Your code here...
})();
