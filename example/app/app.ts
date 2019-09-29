import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";

import * as expressTsController from "../../src";
import { GreetingController } from "./controllers/GreetingController";
import { ImagesController } from "./controllers/ImagesController";
import { MiddlewareController } from "./controllers/MiddlewareController";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../uploads")))

expressTsController.initialize(app, [
    GreetingController,
    ImagesController,
    MiddlewareController
]);

const router = express.Router();
router.get("/hello", (req, res, next) => {
    return res.send("hello");
});

app.use(router);

export default app;
