define([
    'backbone',
    'underscore',
    'js/BackboneRouter',
    'js/Controller',
], function(Backbone,_, BackboneRouter,Controller) {

    "use strict";

    var Application = function () { };

    // Add/mix in the ability of Application to respond to / post events
    _.extend(Application.prototype, Backbone.Events);

    Application.prototype.init = function () {
        var r = new BackboneRouter(this);
        this.router = r;
        if(!Backbone.history.start( {root:"/documentviewer/app/documentviewer"} )){
                    r.navigate("/tag", true);
        }
        this.bindEvents();
    };

    Application.prototype.bindEvents = function() {

    }

    /* loads the cusotmerlist view */
    Application.prototype.showTagList = function(tagid,documentid) {
            //Avoid creating multipl Object.
        if(this.Controller==null || this.Controller==='undefined') {
               this.Controller = new Controller({
                   el: "#leftpanel"
               });
        }
        this.Controller.show(tagid,documentid);
    }

    return Application;
});