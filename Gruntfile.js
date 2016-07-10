module.exports = function (grunt) {

    var DOCUMENTVIEWER_APP_DIRECTORY = "client/app/documentviewer";//qbdtpre-mfa
    var SRC_ROOT_DIRECTORY = "";
    var BUILD_STAGING_DIRECTORY = 'build-stage/';//create stage directory for developer
    var DISTRIBUTION_DIRECTORY = 'dist/';//Creat dist folder for production ready code.

    var APPLICATION_VERSION_NUMBER = "1.0.0"; //This controls the version number in the distribution artifact name
    var DISTRIBUTION_FILENAME = "documentviewer-" + APPLICATION_VERSION_NUMBER + ".tar";


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                        baseUrl: BUILD_STAGING_DIRECTORY
                }
            }
        },
        
      copy: {
            /* "build" copies source files necessary for building into the build staging directory */
            build: {
                files: [
                    {expand: true, cwd: SRC_ROOT_DIRECTORY, src: [DOCUMENTVIEWER_APP_DIRECTORY + 'js/**/*'], dest: BUILD_STAGING_DIRECTORY},//qbdtpre-mfa
                    {expand: true, cwd: SRC_ROOT_DIRECTORY, src: [DOCUMENTVIEWER_APP_DIRECTORY + '*.html'], dest: BUILD_STAGING_DIRECTORY}

                ]
            },


            /* "dist" copies only the resources required to be deployed from the build staging directory into the distribution directory in their proper location */
            dist: {
                files: [
                    {expand: true, cwd: BUILD_STAGING_DIRECTORY, src: [DOCUMENTVIEWER_APP_DIRECTORY + 'js/**/*'], dest: DISTRIBUTION_DIRECTORY},//qbdtpre-mfa
                    {expand: true, cwd: BUILD_STAGING_DIRECTORY, src: ['*.html'], dest: DISTRIBUTION_DIRECTORY}
                    //need following files since the path is determined at runtime
                ]
            }

        },
        clean: {
            main: [
                BUILD_STAGING_DIRECTORY,
                DISTRIBUTION_DIRECTORY
            ]
        },
        cssmin : {
            minify: {
                expand: true,
                cwd: BUILD_STAGING_DIRECTORY+'css',
                src: ['*.css'],
                dest: BUILD_STAGING_DIRECTORY+'css',
                ext: '.css'
          }
        },
        htmlmin: {     
            /* minfying html files */
            dist: { 
                options: { // Target options 
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS:true
                  },
                  files: { // Dictionary of files 
                      './dist/index.html': './dist/index.html' // 'destination': 'source' 
                  }
            }
        },
        hashres: {
            options: {
                encoding: 'utf8',
                fileNameFormat: '${name}.${hash}.${ext}',
                renameFiles: false

            },
            production: {
                src: [
                    //qbdtpre-mfa APP 
                    DISTRIBUTION_DIRECTORY +  'js/start.js',
                    DISTRIBUTION_DIRECTORY +  'css/documentview.css'

                ],
                dest:[
                    //qbdtpre-mfa APP 
                    DISTRIBUTION_DIRECTORY +  'index.html',
                    DISTRIBUTION_DIRECTORY +  'js/start.js',
                    
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: DISTRIBUTION_DIRECTORY + DISTRIBUTION_FILENAME
                },
                files: [
                    {expand: true, cwd: DISTRIBUTION_DIRECTORY, src: ['**'], dest: ''} // makes all src relative to cwd
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-hashres');
    
    

    //"default" outputs a runnable, non-optimized application to the build staging directory, useful for development.  The environment is configured according to the "env" parameter from the command line.
    grunt.registerTask('default', 'create runnable, non-optimized application in staging directory', function () {
        console.log("Creating runnable");
        grunt.task.run('clean','cssmin','copy:build','copy:dist','hashres:production','htmlmin','compress');
    });

    //"distribute" outputs an optimized, distributable application to the distribution directory.  The environment is configured according to the "env" parameter from the command line.
    grunt.registerTask('distribute', 'Prepare a distribution package', function () {
        console.log("Creating application distribution.");
        grunt.task.run('clean', 'stage-build', 'cssmin','copy:module-dist', 'requirejs', 'create-distribution');//,'nexusDeployer');
    });

    
    grunt.registerTask('stage-build', 'Stage the build in the ' + BUILD_STAGING_DIRECTORY + ' directory.', function() {
        console.log('Staging build in the ' + BUILD_STAGING_DIRECTORY + ' directory.');
        grunt.task.run("copy:build");
    });

    grunt.registerTask('create-distribution', 'Create the optimized, distributable application in the ' + DISTRIBUTION_DIRECTORY + ' directory.', function() {
        console.log('Creating distribution in the ' + DISTRIBUTION_DIRECTORY + ' directory.');
        grunt.task.run('copy:dist','hashres:production','htmlmin','uglify', 'compress');
    });
};