
//define the base url relative to the test
require.config({
    baseUrl: "../../../../../",
   
});

	
require(['start','js/test/RequireTestConfig'], function() {

    require(['jasmineSetup',
             //  load the tests
       'spec/ControllerSpec.js'
       
    ], function(JasmineSetup) {debugger;

        "use strict";
        //alert(require.env);
        var jasmineEnv = new JasmineSetup().init( '../js/test');

        if(!("$yetify"in window)) {
            jasmineEnv.execute();
        }

    });

});
