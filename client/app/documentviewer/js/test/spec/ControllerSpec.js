define([
    'js/vendors/jquery',
    'js/vendors/backbone',
    'js/Controller',
], function( $, Backbone, Controller) {
	'use strict';
	describe("Controller  test cases", function() {debugger;
	
	   var controller = new Controller();
	   
	   //before call
	   beforeEach (function () {
			 controller = new Controller();        	
			 // initialize customerDataServiceController
			 controller.initialize();
       });
       
	   //after call
       afterEach (function () {
           //paymentMethod = null;
       });        
       debugger;
       // CustomerDataService is intitalized
       it('Is  Controller Initialized', function() {
           expect(controller).toBeDefined();
       });
       
  
	});
});