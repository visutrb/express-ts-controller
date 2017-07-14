import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as passportLocal from "passport-local";

import { initialize } from "../../main/core/manager";
import * as passport from "passport";

const app = express();
const port = 3000;

let localStrategy = new passportLocal.Strategy((username, password, done) => {
    if (username == "username" && password == "password")
        return done(null, { username: username });
    else
        return done(null, false);
});

passport.use("local", localStrategy);
passport.serializeUser((user: any, done) => {
    done(null, user.username);
});
passport.deserializeUser((username: string, done) => {
    done(null, {username: username})
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

initialize(app, [
    path.join(__dirname, "./controllers/**/*.ts"),
    path.join(__dirname, "./controllers/**/*.js")

]).then(() => {
    app.use((req, res, next) => {
        let err = new Error("Not found");
        err["status"] = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        if (err) {
            let status = err.status || 500;
            res.status(status).send({ status: "error", message: err.message });
        }
    });

    app.listen(port, () => {
        // console.log(`Listening on port ${port}.`);
    });

    process.emit("app_started");
});
