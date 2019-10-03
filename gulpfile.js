const browserSync = require('browser-sync').create();
const del = require('del');
const { dest, src, series, parallel, watch } = require('gulp');
const newer = require('gulp-newer');
const srcFolder = './src';
const publicFolder = './public';
const distFolder = './dist';

const configFolders = {
  input: {
    images: `${srcFolder}/assets/images/**/*`,
    public: `${publicFolder}/**/*.{png,json}`
  },
  output: {
    images: `${distFolder}/assets/images/`
  }
};

const { input, output } = configFolders;
function browserSynchronize(done) {
  browserSync.init({
    server: {
      baseDir: srcFolder
    },
    port: 3000
  });
  done();
}

function clean() {
  return del(output.images);
}

function copyImages() {
  return src(input.images)
    .pipe(newer(output.images))
    .pipe(dest(output.images))
    .pipe(browserSync.stream());
}

function copyPublicAssets() {
  return src(input.public)
    .pipe(newer(distFolder))
    .pipe(dest(distFolder))
    .pipe(browserSync.stream());
}

function watchFiles() {
  watch(input.images, copyImages);
  watch(input.public, copyPublicAssets);
}

const watchAll = parallel(watchFiles, browserSynchronize);
const gulp = series(clean, copyImages, copyPublicAssets);
const development = series(gulp, watchAll);
const production = series(gulp);

exports.clean = clean;
exports.watchAll = watchAll;
exports.development = development;
exports.default = production;
