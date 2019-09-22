import { Request, Response } from "express";
import { Controller, Get } from "../../../lib/index";

@Controller("/greet")
export class GreetingController {

    @Get("/")
    greet(req: Request, res: Response) {
        let name = req.query.name || "world";
        res.send(`Hello ${name}`);
    }
}