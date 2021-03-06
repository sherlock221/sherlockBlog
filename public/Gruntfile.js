module.exports = function(grunt) {

    //读取package.json
   // var pkg = grunt.file.readJSON("package.json");


    //初始化Grunt
    grunt.initConfig({

        pkg :"",

        /** 合并 **/
        concat  : {
            /**
             * 测试合并js
             */
            myskin : {
                src : ['source/service/myskin/src/*.css'],
                dest : 'source/service/myskin/myskin.css'
            }
        },

        /**  监听文件夹并且执行任务 **/
        watch : {
            myskin : {
                files : ['source/service/myskin/src/*.css'],
                tasks : ["concat:myskin"],
                options : {
                    //默认 35729端口
                    livereload : true
                }
            }
        },
        /** 压缩j **/
        uglify : {
            plugin : {
                src : "public/src/js/plugin/skycons.js",
                dest : "public/bin/js/plugin/skycons.min.js"
            }
        },

        /** 压缩css **/
        cssmin : {
            options : {
            },
            commonCss : {
                src : 'public/bin/css/common/tag.css',
                dest : 'public/bin/css/common/base.min.css'
            }
        },

        /** js代码检查  **/
        jshint: {
            src : "public/src/js/*.js"
        }


    });

    //合并文件
    grunt.loadNpmTasks('grunt-contrib-concat');
    //压缩js
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //js检查
//    grunt.loadNpmTasks('grunt-contrib-jshint');
    //压缩css
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //watch 监听
    grunt.loadNpmTasks('grunt-contrib-watch');



};