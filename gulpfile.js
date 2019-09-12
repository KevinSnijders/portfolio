// Load plugins
const browserSync = require('browser-sync').create();
const del = require('del');
const {dest, src, series, parallel, watch} = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const newer = require('gulp-newer');
const imageMinify = require('gulp-imagemin');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');

const baseApp = './app/';
const baseBuild = './build/';
const baseTemplates = './templates/';

const dirPaths = {
    app: {
        styles: baseApp + 'styles/**/*.scss',
        scripts: {
            vendors: baseApp + 'scripts/vendors/**/*.js',
            js: baseApp + 'scripts/js/**/*.js',
            react: {
                index: baseApp + 'scripts/react/index.js',
                compiled: baseApp + 'scripts/react/compiled/'
            }
        },
        assets: baseApp + 'assets/**/*',
    },
    build: {
        styles: baseBuild + 'css/',
        scripts: baseBuild + 'js/',
        assets: baseBuild + 'assets',
    },
    templates: baseTemplates + '**/*.html'
};

const minifiedFileName = 'all.min';
const reactCompiledFileName = 'compiled-react.js';

// BrowserSync
function browserSynchronize(done) {
    browserSync.init({
        server: {
            baseDir: baseBuild
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function clean() {
    return del(baseBuild)
}

function compileStyles() {
    return src([dirPaths.app.styles])
        .pipe(plumber())
        .pipe(sass({outputStyle: "expanded"}))
        .pipe(cleanCSS({compatibility: 'ie11'}))
        .pipe(concat(minifiedFileName + '.css'))
        .pipe(dest(dirPaths.build.styles))
        .pipe(browserSync.stream());
}

function browserifyReact() {
    let {scripts} = dirPaths.app;
    return browserify(scripts.react.index)
        .transform(babelify, {presets: ["@babel/preset-env", "@babel/preset-react"]})
        .bundle()
        .pipe(source(reactCompiledFileName))
        .pipe(streamify(uglify()))
        .pipe(dest(scripts.react.compiled))
}

function compileScripts() {
    let {scripts} = dirPaths.app;
    let bootstrap = "node_modules/bootstrap/dist/js/*.js";
    return src([scripts.vendors, bootstrap, scripts.js, scripts.react.compiled + reactCompiledFileName])
        .pipe(plumber())
        .pipe(babel())
        //.pipe(uglify())
        .pipe(concat(minifiedFileName + '.js'))
        .pipe(dest(dirPaths.build.scripts))
        .pipe(browserSync.stream());
}

function copyTemplates() {
    return src([dirPaths.templates])
        .pipe(plumber())
        .pipe(dest(baseBuild))
        .pipe(browserSync.stream());

}

function copyAssets() {
    return src(dirPaths.app.assets)
        .pipe(newer(dirPaths.build.assets))
        // .pipe(
        //     imageMinify([
        //         imageMinify.gifsicle({interlaced: true}),
        //         imageMinify.jpegtran({progressive: true}),
        //         imageMinify.optipng({optimizationLevel: 5}),
        //         imageMinify.svgo({
        //             plugins: [
        //                 {
        //                     removeViewBox: false,
        //                     collapseGroups: true
        //                 }
        //             ]
        //         })
        //     ])
        // )
        .pipe(dest(dirPaths.build.assets))
        .pipe(browserSync.stream());
}

function watchFiles() {
    let {scripts} = dirPaths.app;
    watch(dirPaths.app.styles, compileStyles);
    watch([scripts.vendors, scripts.js], series(compileScripts));
    watch(dirPaths.app.assets, copyAssets);
    watch(dirPaths.templates, copyTemplates);
}

const scripts = series(compileScripts);
const combineReactAndScripts = (series(browserifyReact, compileScripts));
const styles = series(compileStyles);
const templates = series(copyTemplates);
const assets = series(copyAssets);
const watchAll = parallel(watchFiles, browserSynchronize);
const build = series(clean, parallel(combineReactAndScripts, styles, templates, assets), watchAll);


exports.clean = clean;
exports.scripts = scripts;
exports.styles = styles;
exports.build = build;
exports.templates = templates;
exports.assets = assets;
exports.watchAll = watchAll;
exports.default = build;