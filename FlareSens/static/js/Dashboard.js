"use strict";

let waterSource = ["https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14027.989845389739!2d77.3037217!3d28.4796231!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddead80e06c3%3A0xd03cfdf82b0b5835!2sSterling%20Gtake%20E-Mobility%20Ltd.!5e0!3m2!1sen!2sin!4v1702193564662!5m2!1sen!2sin", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6396.691836968188!2d77.29347294933457!3d28.479608051774964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce7313b0a4d05%3A0x54438bebcd957cfd!2sGurukul%20Lake!5e0!3m2!1sen!2sin!4v1702193887352!5m2!1sen!2sin"];

let isWater = true;

let direction = ["https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14027.989845389739!2d77.3037217!3d28.4796231!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddead80e06c3%3A0xd03cfdf82b0b5835!2sSterling%20Gtake%20E-Mobility%20Ltd.!5e0!3m2!1sen!2sin!4v1702193564662!5m2!1sen!2sin", "https://www.google.com/maps/embed?pb=!1m27!1m12!1m3!1d7014.154227204591!2d77.29458099200342!3d28.477224233748835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m12!3e6!4m4!1s0x390ce7313b0a4d05%3A0x54438bebcd957cfd!3m2!1d28.4767172!2d77.2942187!4m5!1s0x390cddead80e06c3%3A0xd03cfdf82b0b5835!2sSterling%20Gtake%20E-Mobility%20Ltd.%2C%20Vatika%20Mindscapes%2C%20NH-19%2C%20Sector%2027%2C%20Faridabad%2C%20Haryana!3m2!1d28.4795394!2d77.3037212!5e0!3m2!1sen!2sin!4v1702193983256!5m2!1sen!2sin"];

let isLocation = true;

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
    } else if (this.readyState === "complete") {
        // code here
        document.querySelector(".FlareSens-Button:first-child").addEventListener("click", () => {
            document.querySelector("#map").setAttribute("src", direction[Number(isLocation)])
            isLocation = !isLocation;
        })

        document.querySelector(".FlareSens-Button:last-child").addEventListener("click", () => {
            document.querySelector("#map").setAttribute("src", waterSource[Number(isWater)])
            isWater = !isWater;
            document.querySelector(".FlareSens-Indicator>span>svg:first-child").classList.toggle("FlareSens-AddColor");
            document.querySelector(".FlareSens-Indicator>span>svg:last-child").classList.toggle("FlareSens-BlurColor");
        })
    }
});
