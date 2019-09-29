import { Request, Response } from "express";
import { Controller, Get } from "../../../src";

@Controller("/greet")
export class GreetingController {

    @Get()
    greet(req: Request, res: Response) {
        const name = req.query.name || "world";
        return res.send(`Hello ${name}`);
    }
}
