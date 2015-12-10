module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    jshint: {
      files: ['../javascripts/**/*.js']
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', [ 'sass', 'jshint', 'watch']);
};