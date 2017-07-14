var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');

var spawn = require('child_process').spawn;

gulp.task('default', ['build']);
gulp.task('build', ['buildMain', 'buildTest']);

gulp.task('buildMain', ['clean'], () => {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src('src/main/**/*.ts').pipe(tsProject());
    return tsResult.pipe(gulp.dest('build/main'));
});

gulp.task('buildTest', ['buildMain'], () => {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src('src/test/**/*.ts').pipe(tsProject());
    return tsResult.pipe(gulp.dest('build/test'));
});

gulp.task('clean', () => {
    return gulp.src(['build', 'express-ts-controller-*.tgz']).pipe(clean());
});

gulp.task('test', ['buildTest'], () => {
    return gulp.src('build/test/specs/**/*.js')
        .pipe(mocha());
});

gulp.task('pre-package', ['buildMain'], () => {
    return gulp.src(['package.json', 'README.md']).pipe(gulp.dest('build/main'));
});

gulp.task('pack', ['pre-package'], (done) => {
    console.log('');
    let npm = spawn('npm', ['pack', 'dist/main']);

    npm.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
    });

    npm.on('exit', (exitCode) => {
        console.log('');
        done(exitCode);
    });
});

gulp.task('publish', ['pre-package'], (done) => {
    console.log('');
    let npm = spawn('npm', ['publish', 'build/main']);

    npm.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
    });

    npm.stderr.on('data', (data) => {
        process.stdout.write(data.toString());
    });

    npm.on('exit', (exitCode) => {
        console.log('');
        done(exitCode);
    });
});