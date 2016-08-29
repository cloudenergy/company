// 引入gulp
var gulp = require('gulp'),
    // 引入组件
    browserSync = require('browser-sync').create(), // browser-sync
    pkg = require('gulp-packages')(gulp, [
        'concat',
        'rename',
        'cache',
        'imagemin',
        'sass',
        'jshint'
    ]),
    path = {
        src: {
            html: './src/*.html',
            sass: './src/assets/css/*.scss',
            js: './src/assets/js/*.js',
            img: './src/assets/img/*.png'
        },
        dest: {
            html: './public',
            css: './public',
            js: './public',
            img: './public/img'
        }
    };
gulp.task('html', function() {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.dest.html));
});

gulp.task('sass', function() {
    return gulp.src(path.src.sass)
        .pipe(pkg.sass())
        .pipe(pkg.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.dest.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('js', function() {
    return gulp.src(path.src.js)
        .pipe(pkg.jshint())
        .pipe(pkg.jshint.reporter('default'))
        .pipe(pkg.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.dest.js));
});

gulp.task('imagemin', function() {
    gulp.src(path.src.img)
        .pipe(pkg.cache(pkg.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(path.dest.img))
});
gulp.task('watch', ['html', 'sass', 'js', 'imagemin'], browserSync.reload);
gulp.task('browserSync', ['html', 'sass', 'js', 'imagemin'], function() {
    var files = [
        path.dest.html,
        path.dest.css,
        path.dest.js,
        path.dest.img
    ];
    browserSync.init(files, {
        proxy: "www.gugecc.com",
        open: false
    });
    gulp.watch(path.src.sass, ['sass']);
    gulp.watch(path.src.html, ['html']);
    gulp.watch(path.src.js, ['watch']);
    gulp.watch(path.src.img, ['imagemin']);
});


gulp.task('default', function() {
    gulp.start('html', 'sass', 'js', 'imagemin', 'browserSync');
});