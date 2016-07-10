define([
    'jquery',
    'backbone',
    'js/Application'
], function($, Backbone, Application) {

    "use strict";

    /**
     * The SPARouter is UrlMapping.  This simply maps routes (urls) to an appropriate call to the Application object.
     * @type {*}
     */
    
    var BackboneRouter = Backbone.Router.extend({
  
        initialize: function(application) {
            //Simple function to automatically log routes that were triggered by filtering route
            this.Application = application;
			this.bind("route", function(route, args) {
                console.log("Route '" + route + "' triggered.");
			});
        },


        routes: {
            "tag" : "showTagList",
            "tag/:tagid" : "showTagList",
            "tag/:tagid/document/:documentid": "showTagList"
        },  
        
        showTagList: function() {
            this.Application.showTagList();
        },
        showTagList: function(tagid) {
            this.Application.showTagList(tagid);
        },
        showTagList: function(tagid,documentid) {
            this.Application.showTagList(tagid,documentid);
        }
    });
    return BackboneRouter;
});
