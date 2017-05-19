var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');

var spawn = require('child_process').spawn;

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', ['clean'], () => {
    var tsResult = gulp.src('src/**/*.ts').pipe(tsProject());
    return tsResult.pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return gulp.src(['dist', 'express-ts-controller-*.tgz']).pipe(clean());
});

gulp.task('prepackage', ['build'], () => {
    return gulp.src(['package.json', 'README.md']).pipe(gulp.dest('dist/main'));
});

gulp.task('pack', ['prepackage'], (done) => {
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

gulp.task('publish', ['prepackage'], (done) => {
    console.log('');
    let npm = spawn('npm', ['publish', 'dist/main']);

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