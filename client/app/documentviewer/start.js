require.config({

    paths: {
        jquery: 'js/vendors/jquery',
        text: 'js/vendors/text',
        underscore: 'js/vendors/underscore',//For Templating
        backbone: 'js/vendors/backbone', //Banckbone Library heard of Backbone App
        bootstrapmodal: 'js/vendors/bootstrap-modal',//For model window(popup)
		bootstrap: 'js/vendors/bootstrap',//For model window(popup)
    },
    
    //Shim is used in requireJS module to define dependencies
    shim: {
        underscore: {
            exports: "_"
        },
        bootstrap: {
           deps: ['jquery'],
            exports: 'bootstrap'
        },
        bootstrapmodal: {
           deps: ['jquery','bootstrap'],
            exports: 'bootstrapmodal'
        },
        backbone: {
            deps: ['underscore', 'jquery','bootstrap'],
            exports: 'Backbone'
        },
        jquery: {
            exports: '$'
        }
    }
});

require(['js/Application'], function(Application) {
			'use strict';
		//instantiate the Application
		var application = new Application();
		//initialize the application instance
		application.init();

});