/**
 * Created by cameron on 28/03/17.
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    processhtml: {
      build: {
        files: {
          'dist/index.html' : ['index.html'],
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
            'bower_components/reveal.js/js/*.js',
            'js/**/*.js',
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    copy: {
      build: {
        cwd: './',
        src: [ 'css/*' , 'images/*' ],
        dest: 'dist',
        expand: true
      },
    },
    cssmin: {
      target: {
        files: {
          'dist/veganfaq.min.css': [
            'bower_components/reveal.js/css/reveal.css',
            'bower_components/reveal.js/css/theme/night.css'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('default', ['jshint', 'concat', 'cssmin', 'uglify', 'processhtml', 'copy']);
};