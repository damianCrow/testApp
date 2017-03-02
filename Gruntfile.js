module.exports = function(grunt) {

    "use strict";

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.initConfig({

        sass: {

            dev: {
                options: {
                    style: "compressed"
                },

                files : {
                    "css/styles.min.css": "styles.scss"
                }
            }
        },

        autoprefixer: {
        options: {

          browsers: ['last 2 versions', 'ie 9']
        },
        dist: { 
          files: {
            'css/styles.min.css': 'css/styles.min.css'
          }
        }
      },

        watch: {

          scss: {

            files: ["*.scss"],
            tasks: ["sass:dev"]
          },

          css: {

            files: ["css/*.css"],
            tasks: ["autoprefixer"]
          }
        }
    });

    grunt.registerTask("run", ["watch", "autoprefixer"]);
};