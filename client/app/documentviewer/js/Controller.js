define([
    'jquery',
    'backbone',
    'text!js/template/leftpanel.html',
    'text!js/template/rightpanel.html',
    'text!js/template/documentcontent.html',
    'js/view/DocumentContentView',
    'js/view/LeftPanelView',
    'js/view/RightPanelView',
    'js/collection/Tags',
], function($, Backbone, tagTemplate, documentTemplate,documentContentTemplate, documentContentView, tagView, documentView,TagsCollection) {
    "use strict";

    var Controller = Backbone.View.extend({

        model: {},

        initialize: function() {
                //Backbone Listern :
                this.listenTo(Backbone, "showRightPanel", this.showRightPanel);
                this.listenTo(Backbone, "showDocumentModel", this.showDocumentModel);
                this.listenTo(Backbone, "closeModalWindow", this.closeModalWindow);
        },  
       
    show: function(tagid,documentid) {
            
            this.showLeftPanel(tagid,documentid);
        },
        showLeftPanel: function(tagid,documentid) {
            var self = this;
            self.tagid=tagid;self.documentid=documentid;
            var tagCollection = new TagsCollection();
            var response = tagCollection.fetch({url : "http://localhost:7000/v1/api/tags/"});
                
                response.done(function( ) {
                        self.model = tagCollection;
                        if(!self.tagView || self.tagView==null ){
                            self.tagView = new tagView({el:'#leftpanel'});
                        }
                        self.tagView.model = self.model;
                        self.renderLeftPanelView(self.tagid, self.documentid);
                });

                response.fail(function(model, response, options  ) {
                          self.model = {};
                          self.renderLeftPanelView(self.tagid, self.documentid);
                });
        },
        showRightPanel: function(event) {
            var self = this;
            this.tagid=event.tagid;
            this.documentid=event.documentid;
            var documentCollection = new TagsCollection();
            
            var response = documentCollection.fetch({url : "http://localhost:7000/v1/api/tags/"+this.tagid+"/documents"});
                
                response.done(function( ) {
                        self.model = documentCollection;
                         if(!self.documentView || self.documentView==null ){
                            self.documentView = new documentView({el:'#rightpanel'});
                        }
                        self.documentView.model = self.model;
                        self.renderRightPanelView(self.documentid);
                });

                response.fail(function(model, response, options  ) {
                          self.model = {};
                          self.renderRightPanelView({el:'#rightpanel'});
                });
        },

        showDocumentModel: function(event) {
            this.showDocumentContentModal(event.documentid);
            
        },
        showDocumentContentModal: function(documentid){
            var self = this;
            var documentCollection = new TagsCollection();
            
            var response = documentCollection.fetch({url : "http://localhost:7000/v1/api/tags/"+this.tagid+"/documents/"+documentid});
                
                response.done(function( ) {
                        self.model = documentCollection;
                        if(!self.documentContView || self.documentContView==null ){
                            self.documentContView = new documentContentView({el:'#documentContainter'});
                        }
                        self.documentContView.model = self.model;
                        self.renderDocumentContentView();
                });

                response.fail(function(model, response, options  ) {
                          self.model = {};
                          self.renderDocumentContentView();
                });

        },

        renderDocumentContentView: function() {
            this.documentContView.model = this.model;
            this.documentContView.render();
        },

        renderLeftPanelView: function(tagid, documentid) {
            this.tagView.model = this.model;
            this.tagView.render(tagid, documentid);
        },
        renderRightPanelView: function(documentid) {
            this.documentView.model = this.model;
            this.documentView.render(documentid);
        },
        closeModalWindow: function(){
            this.documentContView=null;
        }
        
    });

    return Controller;
});
