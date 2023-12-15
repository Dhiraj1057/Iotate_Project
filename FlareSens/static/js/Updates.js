"use strict";

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
    } else if (this.readyState === "complete") {
        // code here
        document.querySelector(".FlareSens-Article-3>input").addEventListener("change", (event) => {
            let li = document.createElement("li");
            li.append(event.target.files[0].name);
            let p = document.createElement("p");
            p.append("Uploaded");
            let div = document.createElement("div")
            div.appendChild(li);
            div.appendChild(p)

            let parent = document.createElement("div");
            parent.appendChild(div);
            parent.setAttribute("class", "FlareSens-List")
            setTimeout(() => document.querySelector(".FlareSens-Article-2").appendChild(parent), 1000)
        })

    }
});