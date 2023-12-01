"use strict";

function scrollList(direction) {
    const scrollAmount = 200; // Adjust as needed
    const itemList = document.querySelector('.FlareSens-Scroll-Container>article');

    if (direction === 'left') {
        itemList.scrollLeft -= scrollAmount;
    } else {
        itemList.scrollLeft += scrollAmount;
    }
}

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
    } else if (this.readyState === "complete") {
        // code here
    }
});