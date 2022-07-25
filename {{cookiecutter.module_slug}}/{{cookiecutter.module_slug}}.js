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
    // Required version of MagicMirror
    requiresVersion: "2.1.0",
    // Module properties
    items: [],
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
            config: this.config,
            items: this.items
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
                this.renderUI(payload);
            } break;
            default: { };
        }
    },
    // Render response data
    renderUI: function (data) {
        if (!data) {
            console.error(this.translate('Error'))
            return;
        }
        this.items = data;
        // Update dom once items are set
        this.updateDom(500);
    }
});