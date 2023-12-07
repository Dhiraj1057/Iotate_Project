"use strict";

class HeatMap {
    #heatmapContainer;
    #imageElement
    #datapoint
    #heatmap;
    constructor(heatmapContainer, datapoint) {
        this.#heatmapContainer = heatmapContainer;
        this.#imageElement = this.#heatmapContainer.querySelector("img")
        this.#datapoint = datapoint;
        let cfg = {
            container: this.#heatmapContainer,
            radius: 20, // Adjust the radius as needed
        }
        this.#heatmap = h337.create(cfg);
        this.update();
        window.addEventListener("resize", () => this.update())
    }

    update() {
        let ratio = this.#imageElement.clientWidth / this.#imageElement.naturalWidth;
        let paddingWidth = (this.#heatmapContainer.clientWidth - this.#imageElement.clientWidth) / 2;
        let paddingHeight = (this.#heatmapContainer.clientHeight - this.#imageElement.clientHeight) / 2;
        let datapoint = this.#datapoint.map(value => ({ x: Math.round(ratio * value.X + paddingWidth), y: Math.round(ratio * value.X + paddingHeight), value: 10 }))
        this.#heatmap.setData({ data: datapoint });
    }
}

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
        new HeatMap(document.querySelector("#heatmap-container"), [{ X: 225, Y: 225 }])
    }
});


