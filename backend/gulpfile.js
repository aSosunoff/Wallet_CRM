const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const del = require('delete');

function clean(cb) {
    return del([ 'src/public/vendor/**/*.*' ], cb);
}

function scripts(cb){
    gulp.src([
        'node_modules/socket.io-client/dist/socket.io.js',
        'node_modules/socket.io-client/dist/socket.io.js.map'
    ])
    .pipe(gulp.dest('src/public/vendor/socket'));

    cb();
}

const build = gulp.series(clean, scripts);

exports.scripts = scripts;

exports.default = build;
