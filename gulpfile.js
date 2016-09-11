var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pkg = require('gulp-packages')(gulp, [
        'autoprefixer',
        'cache',
        'clean-css',
        'htmlmin',
        'ignore',
        'imagemin',
        'rename',
        'rev',
        'rev-replace',
        'sass',
        'sourcemaps',
        'uglify'
    ]),
    del = require('del'),
    paths = {
        assets: 'public/assets/',
        build: 'public/',
        src: 'src/'
    },
    manifest = {
        css: 'manifest.css.json',
        img: 'manifest.img.json',
        js: 'manifest.js.json'
    },
    mkRev = function(stream, manifest) {
        return stream.pipe(pkg.rev()).pipe(pkg.rename(function(file) {
            file.extname += '?rev=' + /\-(\w+)(\.|$)/.exec(file.basename)[1];
            if (/\-(\w+)\./.test(file.basename)) {
                file.basename = file.basename.replace(/\-(\w+)\./, '.');
            }
            if (/\-(\w+)$/.test(file.basename)) {
                file.basename = file.basename.replace(/\-(\w+)$/, '');
            }
        })).pipe(pkg.rev.manifest(manifest, {
            merge: true
        })).pipe(gulp.dest('.'));
    };

gulp.task('del-img', function() {
    return del([
        paths.assets + 'img',
        manifest.img
    ], {
        force: true
    });
});

gulp.task('del-css', function() {
    return del([
        paths.assets + 'css',
        manifest.css
    ], {
        force: true
    });
});

gulp.task('del-html-js', function() {
    return del([
        paths.assets + 'js',
        paths.build + '**/*.html',
        manifest.js
    ], {
        force: true
    });
});

/**
 * img
 */
gulp.task('build-img', ['del-img'], function() {
    return mkRev(gulp.src(paths.src + '**/img/**/*.*').pipe(pkg.cache(pkg.imagemin({
        progressive: true,
        interlaced: true
    }))).pipe(gulp.dest(paths.build)), manifest.img);
});

/**
 * css
 */
gulp.task('build-css', ['del-css'], function() {
    return mkRev(gulp.src(paths.src + '**/css/**/*.scss').pipe(pkg.sass()).pipe(pkg.sourcemaps.init()).pipe(pkg.autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
    })).pipe(pkg.revReplace({
        manifest: gulp.src(manifest.img)
    })).pipe(gulp.dest(paths.build)).pipe(pkg.cleanCss()).pipe(pkg.rename({
        extname: '.min.css'
    })).pipe(pkg.sourcemaps.write('.', {
        includeContent: false,
        sourceRoot: '/'
    })).pipe(gulp.dest(paths.build)).pipe(pkg.ignore.include('**/*.min.css')), manifest.css);
});

/**
 * js
 */
gulp.task('build-js', ['del-html-js'], function() {
    return mkRev(gulp.src(paths.src + '**/js/**/*.js').pipe(pkg.sourcemaps.init()).pipe(gulp.dest(paths.build)).pipe(pkg.rename({
        extname: '.min.js'
    })).pipe(pkg.uglify()).pipe(pkg.sourcemaps.write('.', {
        includeContent: false,
        sourceRoot: '/'
    })).pipe(gulp.dest(paths.build)).pipe(pkg.ignore.include('**/*.min.js')), manifest.js);
});

/**
 * html
 */
gulp.task('build-html', ['build-css', 'build-js'], function() {
    return gulp.src(paths.src + '**/*.html').pipe(pkg.htmlmin({
        collapseWhitespace: true,
        removeComments: true
    })).pipe(pkg.revReplace({
        manifest: gulp.src(manifest.img)
    })).pipe(pkg.revReplace({
        manifest: gulp.src(manifest.css)
    })).pipe(pkg.revReplace({
        manifest: gulp.src(manifest.js)
    })).pipe(gulp.dest(paths.build)).on('finish', function() {
        setTimeout(browserSync.reload);
    });
});

//监控文件
gulp.task('watch', function() {
    gulp.watch([
        paths.src + '**/img/**/*.*'
    ], ['default']);
    gulp.watch([
        paths.src + '**/css/**/*.*',
        paths.src + '**/js/**/*.*',
        paths.src + '**/*.html'
    ], ['build-html']);
    browserSync.init({
        server: 'public',
        port: 3030,
        ui: {
            port: 3031,
            weinre: {
                port: 3032
            }
        },
        open: false
    });
});

gulp.task('default', ['build-img'], function() {
    gulp.start('build-html');
});