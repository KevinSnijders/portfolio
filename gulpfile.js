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
      svg: `${inputFolder}/assets/svg/**/*.svg`
    }
  },
  output: {
    assets: {
      root: `${outputFolder}/assets/`,
      images: `${outputFolder}/assets/images/`,
      svg: `${outputFolder}/assets/svg/`
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

function copyImageFiles() {
  return src(input.assets.images)
    .pipe(newer(output.assets.images))
    .pipe(dest(output.assets.images))
    .pipe(browserSync.stream());
}

function copySvgFiles() {
  return src(input.assets.svg)
    .pipe(newer(output.assets.svg))
    .pipe(dest(output.assets.svg))
    .pipe(browserSync.stream());
}

function watchFiles() {
  watch(input.assets.images, copyImageFiles);
  watch(input.assets.svg, copySvgFiles);
}

const bundleAssets = series(copyImageFiles, copySvgFiles);
const watchAll = parallel(watchFiles, browserSynchronize);
const development = series(clean, bundleAssets, watchAll);
const production = series(clean, bundleAssets);
exports.clean = clean;
exports.watchAll = watchAll;
exports.development = development;
exports.default = production;
