/*
 *
 * MagicMirror Module: {{cookiecutter.module_slug}}
 *
 * Author: {{cookiecutter.author_name}}
 * License: {{cookiecutter.module_license.upper()}}
 *
 * Global Module:
 */
Module.register("{{cookiecutter.module_slug}}", {
    // default module configuration
    defaults: {
        updateInterval: 60, // minutes
        size: 3,
    },

    requiresVersion: "2.1.0", // Required version of MagicMirror

    // Define translations
    getTranslations() {
        return {
            en: "translations/en.json",
            es: "translations/es.json",
            fr: "translations/fr.json",
        };
    },
    // Define stylesheets
    getStyles: function () {
        return ["{{cookiecutter.module_slug}}.css"];
    },
    // Define scripts
    getScripts: function () {
        return [];
    },
    // Define Nunjucks template
    getTemplate() {
        return "templates/{{cookiecutter.module_slug}}.njk";
    },
    // Define data that is sent to template
    getTemplateData() {
        return {
            config: this.config
        };
    },
    // Runs on initialization
    start: function () {
        // Get initial API data
        this.getData();

        // Schedule update poll
        var self = this;
        setInterval(function () {
            self.getData();
        }, self.config.updateInterval * 60 * 1000); // ms
    },
    // Fetch data request is sent to node helper with provided parameters
    getData: function () {
        this.sendSocketNotification("{{cookiecutter.module_slug}}-REQUEST-DATA", {
            size: this.config.size
        });
    },
    // Fetched data response is coming back from node helper
    socketNotificationReceived: function (notification, payload) {
        switch (notification) {
            case "{{cookiecutter.module_slug}}-RECEIVE-DATA": {
                this.renderData(payload);
            } break;
            default: { };
        }
    },
    // Render response data
    renderData: function (data) {
        //
    }
});