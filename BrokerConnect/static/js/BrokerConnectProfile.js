"use strict";

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
    }
    else if (this.readyState === "complete") {
        // code here
    }
});