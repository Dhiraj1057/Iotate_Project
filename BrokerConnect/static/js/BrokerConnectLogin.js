"use strict";

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
        document.querySelector(".BrokerConnect-Home-filter-Section>div").addEventListener("click", (e) => {
            document.querySelector(".BrokerConnect-Home-filter-Section").classList.add("BrokerConnect-Home-filter-Section-Toggle")
            document.body.classList.remove("body-overflow-hidden")
        })
    } else if (this.readyState === "complete") {
        // code here
    }
});