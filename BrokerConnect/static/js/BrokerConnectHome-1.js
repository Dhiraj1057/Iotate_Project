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

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
        document.querySelector(".BrokerConnect-Home-Mobile-Nav .BrokerConnect-Home-Nav-filter").addEventListener("click", (e) => {
            document.querySelector(".BrokerConnect-Home-filter-Section").classList.remove("BrokerConnect-Home-filter-Section-Toggle")
        })

        document.querySelector(".BrokerConnect-Home-filter-Section>div").addEventListener("click", (e) => {
            document.querySelector(".BrokerConnect-Home-filter-Section").classList.add("BrokerConnect-Home-filter-Section-Toggle")
        })
    }
    else if (this.readyState === "complete") {
        // code here
        let url = 'https://brokerconnect.frappe.cloud/api/resource/Property%20Listing';
        try {
            getData(url).then(data => {
                if (!data.ok) throw new Error(data.status)
                return data.json()
            }).then(data => {
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
});