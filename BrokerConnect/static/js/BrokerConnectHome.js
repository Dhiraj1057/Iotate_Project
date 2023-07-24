"use strict";

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
        document.querySelector(".BrokerConnect-Nav-Button").addEventListener("click", (event) => {
            event.currentTarget.querySelectorAll(".BrokerConnect-Nav-Button div").forEach((element, index) => {
                let ButtonclassList = ["BrokerConnect-Nav-First", "BrokerConnect-Nav-Second", "BrokerConnect-Nav-Third"];
                element.classList.toggle(ButtonclassList[index])
            });
            document.querySelector(".BrokerConnect-List").classList.toggle("BrokerConnect-List-click")
        })
    }
    else if (this.readyState === "complete") {
        // code here

    }
});