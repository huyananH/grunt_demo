module.exports = function(grunt) {
  //初始化configuration
  grunt.initConfig({
    //读取json文件
    pkg:grunt.file.readJSON('package.json'),
    //合并文件
    concat: {
        js: {
          src: ['src/js/*.js'],
          dest: 'dist/js/global.js'
        },
        css: {
          src: ['src/css/*.css'],
          dest: 'dist/css/global.css'
        }
    },
    //压缩js文件
    uglify: {
        js: {
          src: 'dist/js/global.js',
          dest: 'dist/js/global.min.js'
        }
    },
    //压缩css文件
    cssmin: {
        css: {
          src: 'dist/css/global.css',
          dest: 'dist/css/global.min.css'
        }
    },
    //检测文件
    jshint: {
      all: ['./dist/js/global.js']
    },
    //监听
    watch: {
      scripts: {
        files: ['src/js/*.js','src/css/*.css'],
        tasks: ['concat', 'jshint', 'cssmin', 'uglify:js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'index.html',
          'dist/css/global.min.css',
          'dist/js/global.min.js'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        hostname: 'localhost'
      },
      server: {
        options: {
          port: 9001,
          base: './'
        }

      }
    }
});


    //加载任务插件
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-connect');
      grunt.loadNpmTasks('grunt-css');

      //注册任务，执行grunt js 会concat  jshint uglify
      grunt.registerTask('js', ['concat:js', 'jshint', 'uglify:js']);
      //注册任务，执行grunt css 会concat cssmin
      grunt.registerTask('css', ['concat:css', 'cssmin:css']);
      //注册任务，执行grunt  会 css js connect watch
      grunt.registerTask('default', ['css', 'js', 'connect', 'watch']);

};
