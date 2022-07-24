/*
 *
 * MagicMirror Module: {{cookiecutter.module_slug}}
 *
 * Author: {{cookiecutter.author_name}}
 * License: {{cookiecutter.module_license.upper()}}
 *
 * Node Helper:
 */

var NodeHelper = require("node_helper");
const https = require('https');

module.exports = NodeHelper.create({
    // Override socketNotificationReceived method.
    socketNotificationReceived: function (notification, payload) {
        let self = this;
        switch (notification) {
            case "{{cookiecutter.module_slug}}-REQUEST-DATA": {
                const options = {
                    hostname: 'random-data-api.com',
                    port: 443,
                    path: '/api/appliance/random_appliance?size=3',
                    method: 'GET',
                };
                const request = https.request(options, (res) => {
                    res.on('data', (data) => {
                        // The API call was successful!
                        console.log(`${this.translate("Success")}`, data);
                        // Send response back to global module
                        self.sendSocketNotification("{{cookiecutter.module_slug}}-RECEIVE-DATA", data);
                    });
                });
                request.on('error', (error) => {
                    // There was an error
                    console.error(`${this.translate("Error")}`, v);
                });

                request.end();
            }; break;
            default: { };
        }
    }
});