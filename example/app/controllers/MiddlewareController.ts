import { Request, Response, NextFunction } from "express";
import { Controller, Get } from "../../../src";

@Controller("/middleware")
export class MiddlewareController {

    @Get("/with-before-action", {
        beforeAction: [
            (req, res, next) => {
                req["beforeActionValue"] = "hello world";
                next();
            }
        ]
    })
    actionWithBeforeAction(req: Request, res: Response) {
        const beforeActionValue = req["beforeActionValue"];
        res.send(beforeActionValue);
    }

    @Get("/with-after-action", {
        afterAction: [
            (req, res) => {
                const handlerValue = req["handlerValue"];
                res.send(handlerValue);
            }
        ]
    })
    actionWithAfterAction(req: Request, res: Response, next: NextFunction) {
        req["handlerValue"] = "hello world";
        next();
    }

    @Get("/with-before-and-after-action", {
        beforeAction: [
            (req, res, next) => {
                req["beforeActionValue"] = "before";
                next();
            }
        ],
        afterAction: [
            (req, res) => {
                const beforeActionValue = req["beforeActionValue"];
                const handlerValue = req["handlerValue"];
                const afterActionValue = "after";
                res.json({ beforeActionValue, handlerValue, afterActionValue });
            }
        ]
    })
    actionWithBeforeAndAfterAction(req: Request, res: Response, next: NextFunction) {
        req["handlerValue"] = "handler";
        next();
    }
}
