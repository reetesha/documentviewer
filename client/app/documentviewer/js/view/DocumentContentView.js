define([
    'jquery',
    'backbone',
    'text!js/template/documentcontent.html' ,
    'js/collection/Tags',   
], function($, Backbone,documentContentTemplate,TagsCollection) {
    "use strict";

    var DocumentContentView = Backbone.View.extend({

        template:_.template(documentContentTemplate),

        initialize: function() {
              this.template =  documentContentTemplate;
            
        },
         events: { 
            'click #modalclosebutton,#modalcrossbutton' : 'closeModalView',

        },

        render: function() {

            var document = this.model.toJSON();
            this.template =  documentContentTemplate;
            this.template= _.template(this.template);
            if(document) {
                    this.$el.html(this.template({document: document}));

            }
            else {
                    this.$el.html(this.template({document: document}));
                }
            $('#myModal').modal('show');

            },
            closeModalView: function(){
                this.el = this.$el = null;
                $( "#documentContainter" ).empty();$('.modal-backdrop').remove();
                if(this.documentContentview && this.documentContentview.options){
                   this.documentContentview.options.el=null;
               }
               this.DocumentContentView=null;
               this.stopListening();
               Backbone.trigger("closeModalWindow");
            }
    });

    return DocumentContentView;
});