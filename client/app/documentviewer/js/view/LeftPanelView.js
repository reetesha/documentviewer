define([
    'jquery',
    'backbone',
    'text!js/template/leftpanel.html'    
], function($, Backbone, tagsTemplate) {
    "use strict";

    var TagsView = Backbone.View.extend({

        template:_.template(tagsTemplate),

        initialize: function() {
              this.template =  tagsTemplate;
        },
        events: { 
            'click .item' : 'showRightPanel',

        },
        showRightPanel: function(e){
            var tagid = e.target.id;
            Backbone.history.navigate("tag/"+tagid, true);

        },
        render: function(tagid,documentid) {

            var tags = this.model.toJSON();
            this.template =  tagsTemplate;
            this.template= _.template(this.template);
            if(tags && tags.length > 0) {
                   this.$el.html(this.template({tags: tags}));
               }
                else {
                    this.$el.html(this.template({tags: tags}));
                }
                
                //Make by default first tag of array as default while loading page.
                if(!tagid){
                    tagid= tags[0].id;
                }
                if(tagid){
                    $('.item').css("background","#f1f1f1");
                    $('#'+tagid).css("background","#adadad");
                    Backbone.trigger("showRightPanel",{ tagid: tagid,documentid: documentid });
                }

            }
    });

    return TagsView;
});