"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");

//Вставка спрайта в html и сжатие
gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

//Исправление критичности ошибок, создание карты, простановка префиксов, сжатие
gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

//Сжатие JS
gulp.task("js", function () {
  return gulp.src("source/js/*.js")
      .pipe(uglify())
      .pipe(gulp.dest("build/js"));
});

//Создание спрайта
gulp.task("sprite", function () {
  return gulp.src("source/img/*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
})

//Сжатие картинок jpeg, png, svg
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
  imagemin.optipng({optimizationLevel: 3}),
  imagemin.jpegtran({progressive: true}),
  imagemin.svgo()
  ]))
  .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 75}))
  .pipe(gulp.dest("source/img"));
});

//Копирование изображений и шрифтов в build
gulp.task("copy", function () {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/img/**",
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html",
  "js"
));

gulp.task("refresh", function(done) {
  server.reload();
  done();
})

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/img/*.png", gulp.series("copy", "refresh"));
});

gulp.task("start", gulp.series("build", "server"));
