import * as express from "express";
import * as passport from "passport";
import * as passportCustom from "passport-custom";

import { initialize } from "../../main/core/manager";
import { SiteController } from "./controllers/SiteController";

const app: express.Express = express();
const port = 3000;

passport.use('custom', new passportCustom.Strategy((req, done) => {
    let authorization = req.headers["authorization"];
    if (!authorization || authorization != '1234')
        return done(null, false);

    return done(null, { authorization: authorization });
}));

passport.serializeUser((user: any, done) => {
    return done(null, user.authorization);
});

passport.deserializeUser((authorization, done) => {
    return done(null, { authorization: authorization });
});

app.use(passport.initialize());

initialize(app, [SiteController]);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
