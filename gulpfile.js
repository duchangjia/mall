'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');//重命名
// var uglify=require('gulp-uglify');//js压缩
var watch=require('gulp-watch');//监视
var less=require('gulp-less');//编译less
var minifyCss = require("gulp-minify-css");//压缩CSS
var minifyHtml = require("gulp-minify-html");//压缩html
// var jshint = require("gulp-jshint");//js检查
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件
var connect=require('gulp-connect');//引入gulp-connect模块

var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var processors = [px2rem({remUnit: 75})];
gulp.task('watchs',function(){
    gulp.watch('app/page/**/*.html',gulp.series('html'));
    gulp.watch('app/page/**/*.less',gulp.series('css'));
})
gulp.task('connect',function(){
    connect.server({
        root:'dist',//根目录
        // ip:'192.168.11.62',//默认localhost:8080
        livereload:true,//自动更新
        port:8081//端口
    })
})

gulp.task('html',function(){
    return gulp.src('app/page/**/*.html')
        .pipe(gulp.dest('dist/page'))
        .pipe(connect.reload());
})

gulp.task('css',function(){
    return gulp.src(['app/**/**/*.less','app/**/*.less'])
        .pipe(less())//编译less
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist')) //当前对应css文件
        .pipe(connect.reload());//更新
})

/*gulp.task('js',function(){
    return gulp.src('cug_vatti_Backpass/js/jquery-1.8.0.min.js')
        .pipe(jshint())//检查代码
        .pipe(uglify())//压缩js
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
})*/
//gulp.series|4.0 依赖
//gulp.parallel|4.0 多个依赖嵌套
gulp.task('default',gulp.series(gulp.parallel('connect','watchs','html','css')));

