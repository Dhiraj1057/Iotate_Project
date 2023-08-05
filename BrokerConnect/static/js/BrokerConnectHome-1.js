"use strict";

function createList(id, property, location_pic) {
    const htmlData = `<div class="BrokerConnect-Home-Housing-data" id=${id}><img src="${property.property_profile ? property.property_profile : ""} " alt=""><div><div><div><img src="${location_pic} " alt="">${property.address}</div></div><div><div>${property.area_sqft}sqft</div><hr><div>${property.bhk}BHK</div><hr><div>${property.property_type}</div></div></div></div>`
    const parser = new DOMParser()
    return parser.parseFromString(htmlData, 'text/html').body.firstChild
}

async function getData(url) {
    return await fetch(url, {
        headers: {
            "X-Frappe-CSRF-Token": frappe.csrf_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

function selection(event) {
    event.target.parentElement.parentElement.querySelector("input").value = event.target.textContent;
}

function ActivateSelection(element) {
    setTimeout(() => {
        element.querySelectorAll("li").forEach(element => {
            element.addEventListener("click", selection)
        })
    }, 500)
}

function deactivateSelection(element) {
    element.querySelectorAll("li").forEach(element => {
        element.removeEventListener("click", selection)
    })
}

function clearForm() {
    let inputs = document.querySelectorAll(".BrokerConnect-Home-Input input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function Home(url) {
    try {
        getData(url).then(data => {
            if (!data.ok) throw new Error(data.status)
            return data.json()
        }).then(data => {
            document.querySelectorAll(".BrokerConnect-Home-Section .BrokerConnect-Home-Housing-data").forEach(element => element.remove())
            for (let i = 0; i < data.data.length; i++) {
                let id = data.data[i].name;
                url = `https://brokerconnect.frappe.cloud/api/resource/Property%20Listing/${id}`;
                getData(url).then(data => {
                    if (!data.ok) throw new Error(data.status)
                    return data.json()
                }).then(data => {
                    document.querySelector(".BrokerConnect-Home-Section").appendChild(createList(id, data.data, "/files/Location-1.png"))
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
        document.querySelector(".BrokerConnect-Home-Mobile-Nav .BrokerConnect-Home-Nav-filter").addEventListener("click", (e) => {
            clearForm();
            document.querySelector(".BrokerConnect-Home-filter-Section").classList.remove("BrokerConnect-Home-filter-Section-Toggle")
        })

        document.querySelector(".BrokerConnect-Home-filter-Section>div").addEventListener("click", (e) => {
            document.querySelector(".BrokerConnect-Home-filter-Section").classList.add("BrokerConnect-Home-filter-Section-Toggle")
        })

        document.querySelectorAll(".BrokerConnect-Home-Input ul li").forEach(element => {
            element.addEventListener("click", selection)
        })

        document.querySelectorAll(".BrokerConnect-Home-Input input")[1].addEventListener("click", event => {
            ActivateSelection(event.target.parentNode)
            event.target.parentNode.querySelectorAll("li").forEach(element => element.remove());
            let value = document.querySelector(".BrokerConnect-Home-Input input").value
            let url = `https://brokerconnect.frappe.cloud/api/resource/District?filters=[["state", "=", "${value}"]]`;
            try {
                getData(url).then(data => {
                    if (!data.ok) throw new Error(data.status)
                    return data.json()
                }).then(data => {
                    for (let i = 0; i < data.data.length; i++) {
                        event.target.parentNode.querySelector("ul").insertAdjacentHTML("beforeend", `<li>${data.data[i].name}</li>`);
                    }
                })
            } catch (error) {
                console.log(error);
            }
            deactivateSelection(event.target.parentNode)
        })

        document.querySelectorAll(".BrokerConnect-Home-Input input").forEach(element => {
            element.onkeydown = (event) => {
                setTimeout(() => {
                    event.target.parentNode.querySelectorAll("li").forEach(element => {
                        if (element.textContent.toLowerCase().startsWith(event.target.value.toLowerCase())) {
                            element.style.display = "block"
                        } else {
                            element.style.display = "none"
                        }
                    }, 100)
                })
            }
        })

        document.querySelector(".BrokerConnect-Home-Button").addEventListener("click", (event) => {
            event.preventDefault();
            let inputs = document.querySelectorAll(".BrokerConnect-Home-Input input");
            let levels = ["state", "district", "property_type", "query_type", "bhk", "area_sqft"]
            let url = "https://brokerconnect.frappe.cloud/api/resource/Property%20Listing?filters="
            let param = "";
            for (let i = 0; i < levels.length; i++) {
                if (inputs[i].value) {
                    param += `["${levels[i]}", "=", "${inputs[i].value}"], `
                }
                inputs[i].value = "";
            }
            if (param.endsWith(", ")) {
                param = param.slice(0, param.length - 2);
            }
            url += `[${param}]`;
            Home(url);
            document.querySelector(".BrokerConnect-Home-filter-Section").classList.add("BrokerConnect-Home-filter-Section-Toggle")
        })

    } else if (this.readyState === "complete") {
        // code here
        let url = 'https://brokerconnect.frappe.cloud/api/resource/Property%20Listing';
        Home(url);
    }
});