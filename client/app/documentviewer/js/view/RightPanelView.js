define([
    'jquery',
    'backbone',
    'text!js/template/rightpanel.html'    
], function($, Backbone, documentTemplate) {
    "use strict";

    var DocumentsView = Backbone.View.extend({

        template:_.template(documentTemplate),

        initialize: function() {
              this.template =  documentTemplate;
            
        },
         events: { 
            'click .tablerow' : 'showDocumentContentModal',

        },
        showDocumentContentModal: function(e){
            var documentid = e.target.id;

            Backbone.trigger("showDocumentModel",{ documentid: documentid });
        },

        renderDocumentContentView: function() {
            this.view.model = this.model;
            this.view.render();
        },
        render: function(documentid) {

            var documents = this.model.toJSON();
            this.template =  documentTemplate;
            this.template= _.template(this.template);
            if(documents && documents.length > 0) {
                    this.$el.html(this.template({documents: documents}));

            }
            else {
                    this.$el.html(this.template({documents: documents}));
                }
                if(documentid ){
                    Backbone.trigger("showDocumentModel",{ documentid: documentid });
                }

        }
    });
    return DocumentsView;
});