// 引入gulp
var gulp = require('gulp');
// 引入组件
var concat = require('gulp-concat'), //合并文件
    rename = require('gulp-rename'), //重命名
    sass = require('gulp-scss'), //编译
    jshint = require('gulp-jshint'), //js检查
    uglify = require('gulp-uglify'), // js压缩
    browerSync = require('browser-sync'), // browser-sync
    path = {
        src: {
            html: './.html',
            sass: './assets/.scss',
            js: './assets/*.js'
        },
        dest: {
            html: './',
            css: './assets',
            js: './assets'
        }
    };
gulp.task('html', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dest.html));
});
gulp.task('sass', function() {
    gulp.src(path.src.sass)
        .pipe(sass())
        .pipe(rename({
            suffix: '.s'
        }))
        .pipe(gulp.dest(path.dest.css))
});
gulp.task('js', function() {
    gulp.src(path.src.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.dest.js));
});
gulp.task('browserSync', function() {
    var files = [
        path.dest.html,
        path.dest.css,
        path.dest.js
    ];
    browerSync.init(files, {
        server: {
            baseDir: './',
            directory: true
        }
    });
});
gulp.task('default', function() {
    gulp.start('sass', 'js', 'browserSync');
    gulp.watch(path.src.html, function() {
        gulp.run('browserSync');
    });
    //监听SASS
    gulp.watch(path.src.sass, function() {
        gulp.run('sass');
    });
    //监听JS
    gulp.watch(path.src.js, function() {
        gulp.run('js');
    });
});
gulp.task('watch', function() {
    livereload.listen();
    server.listen(port, function(err) {
        if (err) {
            return console.log(err);
        }

        // 监听html
        gulp.watch('./*.html', function(event) {
            gulp.run('html');
        })

        // 监听css
        gulp.watch('./assets/*.scss', function() {
            gulp.run('css');
        });

        // 监听js
        gulp.watch('./assets/*.js', function() {
            gulp.run('js');
        });
    });
});

gulp.task('watch', function() {
    //监听HTML
    gulp.watch(path.src.html, function() {
        gulp.run('html');
    });
    //监听SASS
    gulp.watch(path.src.sass, function() {
        gulp.run('sass');
    });
    //监听JS
    gulp.watch(path.src.js, function() {
        gulp.run('js');
    });
});