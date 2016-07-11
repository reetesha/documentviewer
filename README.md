# DocumentViewer
DocumentViewer App

#Steps to run app:
Step 1: git clone h

Step 2: npm install

Step 3: node app.js

Step 4: Open browser and hit URL :http://localhost:7000/


#Assumption :
This app is build on following assumption:

1) I have given the name of this app as DocumentViewer and currentl supported document type is email. However this app can be extended to any type of documents.
2) By default : First Tagged type will be selected when app is loaded.
3) The lapyt of this app is diveded into left & right  panel, so taht it will look like in a folder structure and similar to email client.
4) I have provided the bookmark URL to directly go to tag and document using following requirement:
	a) Bookmark to show all list of tags
	a) Bookmark to show particular tag based on URL tagid
	c) Bookmark to show all documents of particular tagid
	e) Bookmark to show particular document by documentid

5) Document content will be shown in modal window(Popup)


#Enhancement :
1) Athentication and autherization. Currently there's authentication/Autherization
2) Multiple document support. Currently it support only email based documents
3) Monitoring and instrutmentaion : Logging from client and server api using logging framework and RUM

Client(UI part) :
1) widgetization so that it can be used by other application.
2) SPA using Anugular and React

Server(Rest API):
1) Add swagger documents for rest api.
2) Multiple document support.

#Architecture daigram :
<img src="https://raw.githubusercontent.com/reetesha/documentviewer/master/documentviewer_Architecture_daigram.png" alt="Smiley face" height="400">

This app is divided into 2 project Client(UI) and server(Rest API). Both of this is project created in GIT repo and server by NodeJS server

Front End Tech Stack Used (Client project):
1- BackboneJS to build SPA and routing
2- REquireJS : for JavaScript depedency management and organization of JavaScript files
3- GruntJS : For Packing app like minifiying, concatenation etc
4- NodeJS to host the app and development of Rest APIs
5- Jasmine for Unit Test cases.

#Bookmark 
In Document Viewer app , particular tag and docuement can be access directly using below URLS- 
http://localhost:7000/#tag/{tagid}/document/{documentid}

1- Bookmark URL to get particular tag documents list - http://localhost:7000/#tag/1001
2- Bookmark URL to get particular document - http://localhost:7000/#tag/1001/document/100001

#Rest API(server project)

All interaction in UI is happeining using Rest API. Below are the assumption :

1) HATEOAS(Hypermedia as the Engine of Application State), hypertext links should be used to create a better navigation through the API.
2) Used plural nouns, used sub-resources for relations, Given Version to API and used HTTP status codes (sucess and error)
3) Mock the JSON data and created Rest API in JavaScript and deployed into NodeJS server

http://localhost:7000/v1/api/tags/{id}/documents/{documentid}

There are 3 below GET HTTP API calls created to build the apii :

1- Get all tags http://localhost:7000/v1/api/tags/{tagid}
2- Get all documents by tag name  http://localhost:7000/v1/api/tags/{tagid}/documents
3- get documents by tag name and document:id http://localhost:7000/v1/api/tags/{id}/documents/{documentid}


#Problem Statement
The objective of this project is to build a web based single-page-application user-interface to display documents organized by tags in folder like structure. Assume document is an email message for purpose of building the demo.

** Background
Our repository consists of Documents which are "tagged."  Documents themselves are immutable, that is, unchanging.Think of an e-mail message: the content of that message never changes.

Each document is associated with a set of strings: these strings are called "tags."  Example tags in our system is "unread": if a document has the string "unread" in its tag-set, then the document has never been read by the user. A document can be associated with multiple tags.


Define REST resource based API interface to access documents and associated tags.Mock the data for various resource operations.

Build an user interface with following functionality.
- Displays all available unique tags (simlar to an email client displaying folders).
- Upon click of a tags displays all documents matching the selected tag.
- Upon selecting a document, displays the contents.
- Though the applications is SPA, application should facilitate the bookmarkable URL for given tag or document.
- All interactions with the backend should be via a REST API.

** Submission Guidelines
- Checkin working code into your own publically accessilble git repository and provide the link.
    - Create a readme describing the outlilne of approach and additional assumptions made.
    - Provide steps to deploy and view the SPA app.
    - Create a list of known issues (if any) in git.
- Make sure there is enough sample data to demo the full functionality.
- Please go ahead and make assumptions regarding anything that is not explicitly mentioned. Be sure to conspicuously bring out and state such assumptions
- Do consider code hygiene and technical excellence aspects. Unit tests and their quality will carry weightage
*************************************** End of Problem Statement *************************************
#App Screen Shot
<img src="https://raw.githubusercontent.com/reetesha/documentviewer/master/DocumentViewer_SC.png" alt="Smiley face" height="400">

