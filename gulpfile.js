var gulp = require('gulp');
var traceur = require('gulp-traceur');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var through = require('through2');
var fs = require('fs');
var path = require("path");
var lodash = require('lodash');


var allJsFiles = 'src/**/*.js';
var jsChallengeFiles = 'src/challenges/**/challenge.js';
var jsSetupFiles = 'src/challenges/**/setup.js';
var jsAppFiles = ['src/**/*.js', '!src/challenges/**'];
var htmlFiles = 'src/**/*.html';

var jsBinDistUrl = 'http://robianmcd.github.io/the-sandbox-challenge/dist-jsBin';

var replaceWithFile = function(filePath, outName) {
    return through.obj(function(file, encoding, callback) {
        var gulpContext = this;

        fs.readFile(filePath, 'utf8', function(err,data) {
            file.contents = new Buffer(data);
            file.path = path.join(path.dirname(file.path), outName);

            gulpContext.push(file);
            callback();
        });
    });
};

var template = function(data, options) {
    return through.obj(function(file, encoding, callback) {
        var resolvedData = {};

        for (key in data) {
            if(typeof data[key] === 'function') {
                resolvedData[key] = data[key](file);
            }
            else {
                resolvedData[key] = data[key];
            }
        }

        file.contents = new Buffer(lodash.template(file.contents.toString(), resolvedData, options));
        this.push(file);
        callback();
    });
};

var getRelativePathFromFile = function(file) {
    return path.dirname(file.relative).replace(/\\/g, '/');
}

gulp.task('buildIndexFiles', function() {
    gulp.src('src/**/setup.js')
        .pipe(replaceWithFile('src/indexTemplate.html', 'index.html'))
        .pipe(template({
            distFolder: jsBinDistUrl,
            setupFolder: getRelativePathFromFile
        }))
        .pipe(gulp.dest('dist-jsBin'));

    gulp.src('src/**/setup.js')
        .pipe(replaceWithFile('src/indexTemplate.html', 'index.html'))
        .pipe(template({
            distFolder: '../../..',
            setupFolder: getRelativePathFromFile
        }))
        .pipe(replace('</body>', '<script src="challenge.js"></script>\n</body>'))
        .pipe(gulp.dest('dist-local'));
});

gulp.task('buildJs', function() {
    gulp.src(jsAppFiles)
        .pipe(concat('app.concat.js'))
        .pipe(gulp.dest('dist-jsBin'))
        .pipe(gulp.dest('dist-local'));

    gulp.src(jsSetupFiles)
        .pipe(gulp.dest('dist-jsBin/challenges'))
        .pipe(gulp.dest('dist-local/challenges'))

    gulp.src(jsChallengeFiles)
        .pipe(traceur({sourceMaps: true, experimental: true}))
        .pipe(gulp.dest('dist-local/challenges'));
});

gulp.task('buildAll', ['buildJs', 'buildIndexFiles']);

gulp.task('default', ['buildAll'], function() {
    gulp.watch(allJsFiles, ['buildJs']);
    gulp.watch(htmlFiles, ['buildIndexFiles']);
});

