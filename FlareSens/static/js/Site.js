"use strict";

class HeatMap {
    #heatmapContainer;
    #imageElement
    #datapoint
    #heatmap;
    #isShow = true;
    constructor(heatmapContainer) {
        this.#heatmapContainer = heatmapContainer;
        this.#imageElement = this.#heatmapContainer.querySelector("img")
        let cfg = {
            container: this.#heatmapContainer,
            radius: 20, // Adjust the radius as needed
        }
        this.#heatmap = h337.create(cfg);
        this.#autoUpdate()
        window.addEventListener("resize", () => this.#update())
    }

    changeImage(imageElement) {
        this.#imageElement = imageElement;
        this.#autoUpdate();
    }

    changeDatapoint(datapoint) {
        this.#datapoint = datapoint;
        this.#update();
    }

    #autoUpdate() {
        let inputString = this.#imageElement.getAttribute("data-point");
        const validJsonString = inputString.replace(/'/g, "\"");
        this.#datapoint = JSON.parse(validJsonString);
        this.#update();
    }

    #update() {
        let ratio = this.#imageElement.clientWidth / this.#imageElement.naturalWidth;
        this.#heatmapContainer.querySelector("canvas").setAttribute("width", this.#imageElement.clientWidth);
        this.#heatmapContainer.querySelector("canvas").setAttribute("height", this.#heatmapContainer.clientHeight);
        let paddingHeight = (this.#heatmapContainer.clientHeight - this.#imageElement.clientHeight) / 2;
        let datapoint = [];
        if (this.#isShow) {
            datapoint = this.#datapoint.map(value => ({ x: Math.round(ratio * value.X), y: Math.round(ratio * value.Y + paddingHeight), value: 10 }))
        }
        this.#heatmap.setData({ data: datapoint });
    }

    toggle() {
        this.#isShow = !this.#isShow;
        this.#update();
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
        let heatmap = new HeatMap(document.querySelector("#heatmap-container"));
        document.querySelector(".FlareSens-Button-Full").addEventListener("click", () => {
            heatmap.toggle()
        })
    }
});


