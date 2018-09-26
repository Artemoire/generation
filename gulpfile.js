var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

// gulp.task('log', function() {
//     gutil.log('== My Log Task ==')
//   });

gulp.task('build', ['index', 'js', 'assets'])

gulp.task('js', function () {
    gulp.src(
        [
            'src/app/defs.js',
            'src/app/models/*.js',
            'src/app/painters/*.js',
            'src/app/renderers/*.js',
            'src/app/scenes/*.js',
            'src/app/sketch.js'
        ])
        // .pipe(uglify())
        .pipe(concat('sketch.js'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload())
});

gulp.task('assets', function () {
    gulp.src('src/assets/**/*')
        .pipe(gulp.dest('build/assets'))
        .pipe(connect.reload())
});

gulp.task('index', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('build'))
        .pipe(connect.reload())
})

gulp.task('watch', function () {
    gulp.watch('src/app/**/*.js', ['js']);
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/index.html', ['index']);
});

gulp.task('connect', function () {
    connect.server({
        root: './build',
        livereload: true
    })
});

gulp.task('default', ['build', 'connect', 'watch']);