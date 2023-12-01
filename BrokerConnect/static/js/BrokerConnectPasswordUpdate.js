"use strict";

document.addEventListener("readystatechange", function () {
    console.log("readystatechange: " + this.readyState);
    if (this.readyState === "interactive") {
        // code here
        document.querySelector(".BrokerConnect-Login-Sign-In").addEventListener("click", (event) => {
            event.preventDefault();
            const key = frappe.utils.get_url_arg('key');
            const [new_password, confirm_password] = document.querySelectorAll(".BrokerConnect-Login-Input input");
            var args = {
                key: key || "",
                new_password: new_password.value,
                confirm_password: confirm_password.value,
                logout_all_sessions: 1
            }
            if (!args.new_password) {
                frappe.msgprint({
                    title: "Missing Value",
                    message: "Please enter your new password.",
                    clear: true
                });
            }
            frappe.call({
                type: "POST",
                method: "frappe.core.doctype.user.user.update_password",
                args: args,
                callback: (callback) => console.log(callback),
                freeze: true,
                statusCode: (e) => { console.log(e) }
            }).then(data => {
                console.log(data)
                if (data.message == "/") {
                    window.location.href = window.location.origin
                }
            })
        });
    } else if (this.readyState === "complete") {
        // code here
    }
});