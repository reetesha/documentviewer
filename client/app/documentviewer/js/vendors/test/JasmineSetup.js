define(['jasmine', 'jasmineHtml','jasmineJunitReporter'], function(jasmine) {
    "use strict";

    var JasmineSetup = function() {};

    JasmineSetup.prototype.init = function( testFolder ) {

        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var htmlReporter = new jasmine.HtmlReporter();
        jasmineEnv.addReporter(htmlReporter);

        if (testFolder) {
            var junitReporter = new jasmine.JUnitXmlReporter( testFolder );
            jasmineEnv.addReporter(junitReporter);
        }

        jasmineEnv.specFilter = function (spec) {
            return htmlReporter.specFilter(spec);
        };

        return jasmineEnv;

    };

    return JasmineSetup;
});