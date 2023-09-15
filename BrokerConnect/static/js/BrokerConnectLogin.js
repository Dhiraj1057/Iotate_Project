"use strict";

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
        document.querySelector(".BrokerConnect-Login-Sign-In-Section .BrokerConnect-Login-Sign-Out").addEventListener("click", (e) => {
            document.querySelector(".BrokerConnect-Login-Sign-Out-Section").classList.remove("BrokerConnect-Login-Sign-Out-Section-Toggle")
            document.body.classList.add("body-overflow-hidden")
        })
        document.querySelector(".BrokerConnect-Login-Sign-Out-Section>div").addEventListener("click", (e) => {
            document.querySelector(".BrokerConnect-Login-Sign-Out-Section").classList.add("BrokerConnect-Login-Sign-Out-Section-Toggle")
            document.body.classList.remove("body-overflow-hidden")
        })

        document.querySelector(".BrokerConnect-Login-Sign-In").addEventListener("click", (event) => {
            event.preventDefault();
            var args = {};
            args.cmd = "login";
            args.usr = frappe.utils.xss_sanitise((document.querySelectorAll(".BrokerConnect-Login-Input input")[0].value || "").trim());
            args.pwd = document.querySelectorAll(".BrokerConnect-Login-Input input")[1].value;
            args.device = "desktop";
            if (!args.usr || !args.pwd) {
                frappe.msgprint('Both login and password required');
            }
            frappe.call({
                type: "POST",
                args: args,
                callback: (callback) => console.log(callback),
                freeze: true,
                statusCode: (e) => { console.log(e) }
            }).then(data => {
                console.log(data)
                if (data.message == "Logged In") {
                    window.location.href = window.location.origin + data.home_page
                }
            })
        });

        document.querySelector(".BrokerConnect-Login-Sign-Out-Section .BrokerConnect-Login-Sign-Out").addEventListener("click", (event) => {
            event.preventDefault();
            let input = document.querySelectorAll(".BrokerConnect-Login-Sign-Out-Section .BrokerConnect-Login-Input input, .BrokerConnect-Login-Sign-Out-Section .BrokerConnect-Login-Input textarea")
            var args = {};
            args.cmd = "frappe.core.doctype.user.user.sign_up";
            args.full_name = frappe.utils.xss_sanitise((input[0].value || "").trim());
            args.gender = frappe.utils.xss_sanitise((input[1].value || "").trim());
            args.birth_date = frappe.utils.xss_sanitise((input[2].value || "").trim());
            args.email = frappe.utils.xss_sanitise((input[3].value || "").trim());
            args.mobile_no = frappe.utils.xss_sanitise((input[4].value || "").trim());
            args.new_password = frappe.utils.xss_sanitise((input[5].value || "").trim());
            args.location = frappe.utils.xss_sanitise((input[6].value || "").trim());
            args.redirect_to = frappe.utils.sanitise_redirect(frappe.utils.get_url_arg("redirect-to"));
            if (!args.email || !validate_email(args.email) || !args.full_name) {
                console.log(args)
            }
            frappe.call({
                type: "POST",
                args: args,
                callback: (callback) => console.log(callback),
                freeze: true,
                statusCode: (e) => { console.log(e) }
            }).then(data => {
                document.querySelector(".BrokerConnect-Login-Sign-Out-Success").classList.remove("BrokerConnect-Login-Sign-Out-Section-Toggle")
                document.body.classList.add("body-overflow-hidden")
                document.querySelector(".BrokerConnect-Login-Sign-Out-Success div").textContent = data.message[1]
            })
        })
    } else if (this.readyState === "complete") {
        // code here
    }
});