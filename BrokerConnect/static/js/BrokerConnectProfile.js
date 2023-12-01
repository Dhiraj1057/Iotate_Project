"use strict";

async function updateData(url, method, body) {
    return await fetch(url, {
        method: method,
        headers: {
            "X-Frappe-CSRF-Token": frappe.csrf_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    });
}



function resetSettings() {
    let inputs = document.querySelectorAll(".BrokerConnect-Profile-Button input")
    let values = [100, 100, 0, 0]
    for (let i = 0; i < values.length; i++) {
        inputs[i].value = values[i]
    }
}

function generateFilter() {
    let inputs = document.querySelectorAll(".BrokerConnect-Profile-Button input")
    return `brightness(${inputs[0].value}%) saturate(${inputs[1].value}%) blur(${inputs[2].value}px) invert(${inputs[3].value}%)`;
}

function drawImageData(imagedata) {
    const myCanvas = document.querySelector(".BrokerConnect-Profile-canvas-image");
    const ctx = myCanvas.getContext("2d");
    myCanvas.height = imagedata.naturalHeight
    myCanvas.width = imagedata.naturalWidth
    let imageRatio = myCanvas.height / myCanvas.width
    let canvasContainer = document.querySelector(".BrokerConnect-Profile-canvas")
    let zoom = Number(document.querySelector(".BrokerConnect-Profile-Button div[zoom]").getAttribute("zoom"))
    if ((canvasContainer.clientHeight / canvasContainer.clientWidth) > imageRatio) {
        myCanvas.style.width = String(zoom * canvasContainer.clientWidth) + "px"
        myCanvas.style.height = String(zoom * canvasContainer.clientWidth * imageRatio) + "px"
    } else {
        myCanvas.style.height = String(zoom * canvasContainer.clientHeight) + "px"
        myCanvas.style.width = String(zoom * canvasContainer.clientHeight / imageRatio) + "px"
    }
    ctx.filter = generateFilter();
    ctx.drawImage(imagedata, 0, 0);
}

function putImage(imagedata) {
    const myCanvas = document.querySelector(".BrokerConnect-Profile-canvas-image");
    const ctx = myCanvas.getContext("2d");
    myCanvas.height = imagedata.naturalHeight
    myCanvas.width = imagedata.naturalWidth
    let imageRatio = myCanvas.height / myCanvas.width
    let canvasContainer = document.querySelector(".BrokerConnect-Profile-canvas")
    let zoom = Number(document.querySelector(".BrokerConnect-Profile-Button div[zoom]").getAttribute("zoom"))
    if ((canvasContainer.clientHeight / canvasContainer.clientWidth) > imageRatio) {
        myCanvas.style.width = String(zoom * canvasContainer.clientWidth) + "px"
        myCanvas.style.height = String(zoom * canvasContainer.clientWidth * imageRatio) + "px"
    } else {
        myCanvas.style.height = String(zoom * canvasContainer.clientHeight) + "px"
        myCanvas.style.width = String(zoom * canvasContainer.clientHeight / imageRatio) + "px"
    }
    ctx.filter = generateFilter();
    ctx.putImageData(imagedata, 0, 0);
}

function renderImage() {
    const myImage = new Image();
    myImage.addEventListener("load", (event) => {
        drawImageData(myImage)
        if (myImage.src) {
            URL.revokeObjectURL(myImage.src)
        }
    });
    if (document.querySelector(".BrokerConnect-Profile-Label input").files.length) {
        myImage.src = URL.createObjectURL(document.querySelector(".BrokerConnect-Profile-Label input").files[0])
    }
}

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
        document.querySelector(".BrokerConnect-Profile-Edit").addEventListener("click", (event) => {
            switch (event.target.textContent) {
                case "Edit":
                    event.target.classList.add("BrokerConnect-Profile-Edit-Toggle")
                    event.target.textContent = "Save"
                    document.querySelectorAll(".BrokerConnect-Profile-Input input, .BrokerConnect-Profile-Input textarea").forEach(element => {
                        element.removeAttribute("readonly")
                    })
                    break;
                case "Save":
                    event.preventDefault();
                    let inputs = document.querySelectorAll(".BrokerConnect-Profile-Input input, .BrokerConnect-Profile-Input textarea");
                    let keys = ["full_name", "birth_date", "mobile_no", "email", "location"]
                    let My_json = { user: frappe.session.user };
                    for (let i = 0; i < keys.length; i++) {
                        if (keys[i] === "full_name") {
                            let name_list = inputs[i].value.split(" ")
                            if (name_list.length) {
                                let firstName = ""
                                for (let i = 0; i < name_list.length - 1; i++) {
                                    if (name_list[i]) {
                                        firstName += name_list[i];
                                        firstName += " "
                                    }
                                }
                                if (firstName != "") {
                                    My_json["first_name"] = firstName.slice(0, firstName.length - 1)
                                }
                                if (name_list[name_list.length - 1]) {
                                    My_json["last_name"] = name_list[name_list.length - 1]
                                }
                            }
                            continue
                        }
                        My_json[keys[i]] = inputs[i].value;
                    }
                    let url = `https://brokerconnect.frappe.cloud/api/resource/User/${frappe.session.user}`;
                    let jsonData = JSON.stringify({ data: My_json });
                    try {
                        updateData(url, "PUT", jsonData).then(data => {
                            if (!data.ok) throw new Error(data.status)
                            return data.blob
                            return data.json()
                        }).then(data => {
                            for (let i = 0; i < keys.length; i++) {
                                inputs[i].value = data.data[keys[i]]
                            }
                            event.target.classList.remove("BrokerConnect-Profile-Edit-Toggle")
                            event.target.textContent = "Edit"
                            document.querySelectorAll(".BrokerConnect-Profile-Input input, .BrokerConnect-Profile-Input textarea").forEach(element => {
                                element.setAttribute('readonly', true);
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                    break;
            }
        })
        document.querySelector(".BrokerConnect-Profile-Change-Pic small").addEventListener("click", () => {
            document.querySelector(".BrokerConnect-Profile-Label").classList.toggle("BrokerConnect-Profile-Label-toggle")
        })
        document.querySelector(".BrokerConnect-Profile-Label input").addEventListener("change", () => {
            document.querySelector(".BrokerConnect-Profile-Edit-Pic").classList.remove("BrokerConnect-Profile-Edit-Pic-toggle");
            document.body.classList.add("body-overflow-hidden")
            resetSettings()
            renderImage()
        })
        document.querySelectorAll(".BrokerConnect-Profile-Button input").forEach(element => {
            element.addEventListener("change", renderImage)
        })
        document.querySelectorAll(".BrokerConnect-Profile-Button div span").forEach(element => {
            element.addEventListener("click", (event) => {
                let zoomElement = document.querySelector(".BrokerConnect-Profile-Button div[zoom]")
                let zoom = Number(zoomElement.getAttribute("zoom"))
                console.log(typeof event.target.textContent)
                switch (event.target.textContent) {
                    case "+":
                        zoom += .05
                        zoomElement.setAttribute("zoom", String(zoom))
                        renderImage()
                        break
                    case "-":
                        zoom -= .05
                        zoomElement.setAttribute("zoom", String(zoom))
                        renderImage()
                        break
                    case "Reset":
                        zoom = 1
                        zoomElement.setAttribute("zoom", String(zoom))
                        resetSettings()
                        renderImage()
                        break
                    case "Crop":
                        let cropElement = document.querySelector(".BrokerConnect-Profile-Crop")
                        cropElement.getBoundingClientRect()
                        let editElement = document.querySelector(".BrokerConnect-Profile-canvas-image")
                        let ctx = editElement.getContext("2d");
                        let image_data = ctx.getImageData(0, 0, cropElement.width, cropElement.height)
                        console.log(image_data)
                        putImage(image_data)
                        break

                }
            })
        })

    }
    else if (this.readyState === "complete") {
        // code here
    }
});
