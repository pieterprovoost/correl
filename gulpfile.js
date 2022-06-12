import gulp from "gulp";
import browserify from "browserify";
import babelify from "babelify";
import streamify from "gulp-streamify";
import uglify from "gulp-uglify";
import source from "vinyl-source-stream";

gulp.task("build", function () {
    return browserify({
      entries: "./src/index.js",
      standalone: "correl"
    })
    .transform(babelify)
    .bundle()
    .pipe(source("correl.js"))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest("dist"));
});
