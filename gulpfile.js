const browserSync = require('browser-sync').create();
const del = require('del');
const { dest, src, series, parallel, watch } = require('gulp');
const newer = require('gulp-newer');
const inputFolder = './src';
const outputFolder = './dist';

const configFolders = {
  input: {
    assets: {
      root: `${inputFolder}/assets/**/*`,
      images: `${inputFolder}/assets/images/**/*`,
      favicon: `${inputFolder}/assets/images/favicon.*`
    }
  },
  output: {
    assets: {
      root: `${outputFolder}/assets/`,
      images: `${outputFolder}/assets/images/`
    }
  }
};

const { input, output } = configFolders;
function browserSynchronize(done) {
  browserSync.init({
    server: {
      baseDir: inputFolder
    },
    port: 3000
  });
  done();
}

function clean() {
  return del(outputFolder);
}

function copyImages() {
  return src(input.assets.images)
    .pipe(newer(output.assets.images))
    .pipe(dest(output.assets.images))
    .pipe(browserSync.stream());
}

function copyFavicon() {
  return src(input.assets.favicon)
    .pipe(newer(outputFolder))
    .pipe(dest(outputFolder))
    .pipe(browserSync.stream());
}

function watchFiles() {
  watch(input.assets.images, copyImages);
  watch(input.assets.favicon, copyFavicon);
}

const watchAll = parallel(watchFiles, browserSynchronize);
const gulp = series(clean, copyImages, copyFavicon);
const development = series(gulp, watchAll);
const production = series(gulp);

exports.clean = clean;
exports.watchAll = watchAll;
exports.development = development;
exports.default = production;
