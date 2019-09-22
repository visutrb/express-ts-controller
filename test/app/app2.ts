import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "../../lib/core/node_modules/passport";
import * as passportLocal from "passport-local";

import { initialize } from "../../lib/core/manager";
import { SiteController } from "./controllers/SiteController";
import { GreetingController } from "./controllers/GreetingController";

const app = express();
const port = 3001;

let localStrategy = new passportLocal.Strategy((username, password, done) => {
    if (username == "username" && password == "password")
        return done(null, { username: username });
    else
        return done(null, null);
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
    SiteController,
    GreetingController

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

    app.listen(port, (err) => {
        // console.log(`Listening on port ${port}.`);
    });

    process.emit("app_started");
});
