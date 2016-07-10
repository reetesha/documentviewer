require.config({

    // baseUrl should not be defined in the shared configuration as the folder structure of tests
    // may not be consistent across all tests.

    urlArgs: 'cb=' + Math.random(),     // avoid caching of tests

    paths: {
        jasmine: 'js/vendors/test/jasmine',
        jasmineHtml: 'js/vendors/test/jasmine-html',
        jasmineJunitReporter: 'js/vendors/test/jasmine.junit_reporter',
        jasmineSetup: 'js/vendors/test/JasmineSetup'
    },
    shim: {
      jasmine: {
        exports: 'jasmine'
      },
      jasmineHtml: {
        deps: ['jasmine'],
        exports: 'jasmineHtml'
      },
      jasmineJunitReporter: {
        deps: ['jasmine'],
        exports: 'jasmineJunitReporter'
      },
      jasmineSetup: {
          exports: 'JasmineSetup'
      }
    }

});