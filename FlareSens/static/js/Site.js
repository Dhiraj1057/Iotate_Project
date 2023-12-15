"use strict";

class HeatMap {
    #heatmapContainer;
    #imageElement
    #canvas
    #datapoint
    #heatmap;
    #isShow = true;
    #cfg
    constructor(heatmapContainer) {
        this.#heatmapContainer = heatmapContainer;
        this.#imageElement = this.#heatmapContainer.querySelector("img")
        this.#cfg = {
            container: this.#heatmapContainer,
            radius: 20, // Adjust the radius as needed

        }
        this.#heatmap = h337.create(this.#cfg);
        this.#canvas = this.#heatmapContainer.querySelector("canvas:last-child");
        this.#autoUpdate()
        window.addEventListener("resize", () => this.#update())
    }

    changeConfig(cfg) {
        for (const item in cfg) {
            this.#cfg[item] = cfg[item]
        }
        this.#heatmap.configure(this.#cfg)
        console.log(cfg)
        this.#update
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
        this.#canvas.setAttribute("width", this.#imageElement.clientWidth);
        this.#canvas.setAttribute("height", this.#heatmapContainer.clientHeight);
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

class MultipleHeatMap {
    constructor(heatmapContainer) {
        let color = JSON.parse(heatmapContainer.querySelector("img").getAttribute("color").replace(/'/g, "\""))
        this.heatmapList = JSON.parse(heatmapContainer.querySelector("img").getAttribute("data-point").replace(/'/g, "\"")).map((value, index) => {
            let heatmap = new HeatMap(heatmapContainer);
            heatmap.changeConfig({
                gradient: {
                    '1': color[index]
                }
            })
            heatmap.changeDatapoint([value])
            return heatmap;
        })
    }

    toggle() {
        this.heatmapList.forEach(value => value.toggle());
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

function overflowHandler() {
    let article = document.querySelector(".FlareSens-Scroll-Container>article");
    if (article.clientWidth < article.scrollWidth) {
        document.querySelectorAll(".FlareSens-Scroll-Container>button").forEach(value => {
            value.classList.add("FlareSens-Scroll-Make-Visual")
        })
    }
}

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
    } else if (this.readyState === "complete") {
        // code here
        overflowHandler();
        let multipleHeatMap = new MultipleHeatMap(document.querySelector("#heatmap-container"))
        document.querySelector(".FlareSens-Button-Full").addEventListener("click", () => {
            multipleHeatMap.toggle();
            document.querySelector(".FlareSens-Indicator>span>svg:first-child").classList.toggle("FlareSens-AddColor");
            document.querySelector(".FlareSens-Indicator>span>svg:last-child").classList.toggle("FlareSens-BlurColor");
        })
    }
});


