
var passport = require('passport'),
    _ = require('underscore')
    //,
  //LocalStrategy = require('passport-local').Strategy;
  


exports.routes = function(app, tags_json) {

 var individualRoutes = {

    allTags: function(req, res) {
      var allTags = _(tags_json).values();
      var newObject = JSON.parse(JSON.stringify(allTags));
      for (var  i = 0; i < newObject.length; i++) {
        delete newObject[i].documents;
      }

      res.send(newObject);
    },

  getDocumentsByTagId: function(req, res) {
     var id = req.params.id;
     console.log('getDocumentsByTagId id='+id);
     var documents;
     for (var  i = 0; i < tags_json.length; i++) {
          if(tags_json[i].id==id){
               documents=tags_json[i].documents;
               //console.log('documents='+documents);
               res.send(documents);
              return;
          }
      }
      res.send({msg: 'Failed to getDocumentsByTagId' + id}, 404);

  },
  getDocumentById: function(req, res) {
     var id = req.params.id;
     var documentid = req.params.documentid;
     console.log('getDocumentById tags_json.length='+tags_json.length);
     var documents;
     var documentNotFound=false;
     if(id && id!=undefined && documentid && documentid!=undefined){
     for (var  i = 0; i < tags_json.length; i++) {
          if(tags_json[i].id==id){
               documents=tags_json[i].documents;
               var doc;
                for(var j=0;j< documents.length;j++ ){
                    doc=documents[j]
                    console.log('GetDocumentById  doc.id='+doc.id+'documentid='+documentid);
                    if(doc.id==documentid){
                       documentNotFound=true;
                       console.log('getDocumentById documentNotFound=true | id='+id+'documents='+doc.id+'documentid='+documentid);
                       res.send(doc); 

                    }
                }
              
          }
       }
     }

      if(documentNotFound==false){
          res.send({msg: 'DocumentId NOT_FOUND in Repository for tagid:'+id+' and documentid:'+documentid}, 404);
      }
    }

  };
  
  // NodeJS API endpoint URL
  app.get('/v1/api/tags', individualRoutes.allTags);
  app.get('/v1/api/tags/:id/documents/:documentid', individualRoutes.getDocumentById);
  app.get('/v1/api/tags/:id/documents', individualRoutes.getDocumentsByTagId);

};
