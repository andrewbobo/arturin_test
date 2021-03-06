var gulp             = require('gulp'),
    autoprefixer     = require('gulp-autoprefixer'),
    sourcemaps       = require('gulp-sourcemaps'),
    minifyCss        = require('gulp-clean-css'),
    rename           = require('gulp-rename'),
    browserSync      = require('browser-sync').create();

const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function(){
    // sass directory
    return gulp.src('./sass/*scss')
            .pipe(sass())
            //outputstyle (nested, compact, expanded, compressed)
            .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
            // sourcemaps
            .pipe(sourcemaps.init())
            // sourcemaps output directory
            .pipe(sourcemaps.write(('./maps')))
            // css output directory
            .pipe(gulp.dest('./css')),
            // watch file
            gulp.watch('./sass/*.scss', ['sass']);
});


// minify css (merge + autoprefix + rename)
gulp.task('minify-css', function(){
   return gulp.src('./css/style.css')
            .pipe(minifyCss())
             // autoprefixer
            .pipe(autoprefixer({
                browsers: ['last 15 versions'],
                cascade: false
            }))
            // minify output directory
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest('./css'))
            // browser sync
            .pipe(browserSync.reload({stream: true})),
            // watch file
            gulp.watch('./css/style.css', ['minify-css']);
});


// sass/css browser tracking
gulp.task('browser-sync', function(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
    // watch html
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// gulp default (sass, minify-css, browser-sync) method
gulp.task('default', ['sass', 'minify-css', 'browser-sync']);
