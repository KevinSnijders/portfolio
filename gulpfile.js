// Load plugins
const browserSync = require('browser-sync').create();
const del = require('del');
const { dest, src, series, parallel, watch } = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const newer = require('gulp-newer');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const watchify = require('watchify');
const htmlmin = require('gulp-htmlmin');
const baseSrc = './src/';
const baseDist = './dist/';

const dirPaths = {
  src: {
    styles: baseSrc + 'styles/**/*.scss',
    scripts: {
      vendors: baseSrc + 'scripts/vendors/**/*.js',
      js: baseSrc + 'scripts/js/**/*.js',
      react: baseSrc + 'scripts/react/index.js',
      nodeModules: 'node_modules/bootstrap/dist/js/*.js'
    },
    assetsSrc: baseSrc + 'assets/**/*',
    templates: baseSrc + 'templates/**/*.html'
  },
  dist: {
    css: baseDist + 'css/',
    js: baseDist + 'js/',
    assetsDist: baseDist + 'assets/'
  }
};

const fileName = {
  vendors: 'vendors.min.js',
  js: 'scripts.min.js',
  react: 'react.min.js',
  all: 'all.min.js'
};

// Input
const { styles, scripts, assetsSrc, templates } = dirPaths.src;

// Output
const { css, js, assetsDist } = dirPaths.dist;

// BrowserSync
function browserSynchronize(done) {
  browserSync.init({
    server: {
      baseDir: baseDist
    },
    port: 3000
  });
  done();
}

function clean() {
  return del(baseDist);
}

function compileStyles() {
  return src([styles])
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(concat('all.min.css'))
    .pipe(dest(css))
    .pipe(browserSync.stream());
}

function browserifyReact() {
  let bundler = browserify(scripts.react, {
    debug: true,
    extensions: ['.js', '.jsx', '.json']
  });

  function bundle() {
    return bundler
      .transform(babelify, {
        presets: ['@babel/preset-env', '@babel/preset-react']
      })
      .bundle()
      .on('error', function(err) {
        console.log(err.message);
        this.emit('end');
      })
      .pipe(source(fileName.react))
      .pipe(streamify(uglify()))
      .pipe(dest(js));
  }

  bundler = watchify(bundler).on('update', bundle);
  return bundle();
}

function compileVendorScripts() {
  return src([scripts.vendors, scripts.nodeModules])
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat(fileName.vendors))
    .pipe(dest(js))
    .pipe(browserSync.stream());
}

function compileScripts() {
  return src([scripts.js])
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat(fileName.js))
    .pipe(dest(js))
    .pipe(browserSync.stream());
}

function bundleScripts() {
  return src([js + fileName.vendors, js + fileName.js, js + fileName.react])
    .pipe(plumber())
    .pipe(concat(fileName.all))
    .pipe(dest(js))
    .pipe(browserSync.stream());
}

function copyTemplates() {
  return src([templates])
    .pipe(plumber())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(dest(baseDist))
    .pipe(browserSync.stream());
}

function copyAssets() {
  return src(assetsSrc)
    .pipe(newer(assetsDist))
    .pipe(dest(assetsDist))
    .pipe(browserSync.stream());
}

function watchFiles() {
  watch(styles, compileStyles);
  watch(assetsSrc, copyAssets);
  watch([scripts.vendors, scripts.nodeModules], series(compileVendorScripts));
  watch(scripts.react, series(browserifyReact));
  watch(scripts.js, series(compileScripts));
  watch(templates, copyTemplates);
}

const stylesAndAssets = series(compileStyles, copyAssets);

const bundleJs = series(compileVendorScripts, compileScripts, browserifyReact);

const watchAll = parallel(watchFiles, browserSynchronize);

const development = series(clean, stylesAndAssets, parallel(bundleJs), copyTemplates, watchAll);

const production = series(
  clean,
  stylesAndAssets,
  parallel(bundleJs),
  bundleScripts,
  copyTemplates,
  watchAll
);

exports.templates = copyTemplates;
exports.clean = clean;
exports.stylesAndAssets = stylesAndAssets;
exports.production = production;
exports.watchAll = watchAll;
exports.default = development;
