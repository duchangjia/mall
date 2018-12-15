'use strict';
var gulp=require('gulp')
var less=require('gulp-less')
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
// var cssnano=require('cssnano');
//1、LESS编译 压缩 --合并并没有必要，一般预处理css都可以导包
var processors = [px2rem({remUnit: 75})];
// gulp.task('lesstask',)
var lesstask=function(){
    //这里执行style任务时自动执行
    // var processors = [px2rem({remUnit: 75})];
    gulp.src(['app/page/**/*.less'])
        .pipe(less())//编译成css
        .pipe(postcss(processors))
        .pipe(gulp.dest('app/page'));
    gulp.src(['app/style/reset.less'])
        .pipe(less())//编译成css
        .pipe(postcss(processors))
        .pipe(gulp.dest('app/style'));
    browserSync.reload();
}
var csstask=function(){
    //这里执行style任务时自动执行

}
// gulp.task('csstask',)
gulp.task('watcher',function(){
     watch('app/page/**/*.less',lesstask);
})
// 启本地服务，并打开浏览器
gulp.task('browser', function(){
    browserSync.init({
        server: './app'    // 访问目录，自动指向该目录下的 index.html 文件
        // proxy: "你的域名或IP"    // 设置代理
    });
});
gulp.task('dev',function(){
    browserSync.init({
        server: 'app'    // 访问目录，自动指向该目录下的 index.html 文件
        // proxy: "你的域名或IP"    // 设置代理
    });
    watch('app/page/**/*.less',lesstask);
})
