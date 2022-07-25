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
                    path: `/api/appliance/random_appliance?size=${payload.size}`,
                    method: 'GET',
                    rejectUnauthorized: false
                };
                const request = https.request(options, (res) => {
                    const body = [];
                    res.on('data', (chunk) => {
                        body.push(chunk);
                    });
                    res.on('end', () => {
                        try {
                            const data = JSON.parse(Buffer.concat(body).toString());
                            // Success - send data back to global module
                            self.sendSocketNotification("{{cookiecutter.module_slug}}-RECEIVE-DATA", data);
                        } catch (e) {
                            // Error - send null back to global module
                            self.sendSocketNotification("{{cookiecutter.module_slug}}-RECEIVE-DATA", null);
                        }
                    });
                });
                request.on('error', (error) => {
                    // Error - send null back to global module
                    self.sendSocketNotification("{{cookiecutter.module_slug}}-RECEIVE-DATA", null);
                });


                request.end();
            }; break;
            default: { };
        }
    }
});