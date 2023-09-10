"use strict";

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
        document.querySelector(".BrokerConnect-Login-Sign-Out-Section>div").addEventListener("click", (e) => {
            document.querySelector(".BrokerConnect-Login-Sign-Out-Section").classList.add("BrokerConnect-Login-Sign-Out-Section-Toggle")
            document.body.classList.remove("body-overflow-hidden")
        })

        document.querySelector(".BrokerConnect-Login-Sign-In-Section .BrokerConnect-Login-Sign-Out").addEventListener("click", (e) => {
            document.querySelector(".BrokerConnect-Login-Sign-Out-Section").classList.remove("BrokerConnect-Login-Sign-Out-Section-Toggle")
            document.body.classList.add("body-overflow-hidden")
        })
    } else if (this.readyState === "complete") {
        // code here
    }
});