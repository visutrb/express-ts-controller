import { Request, Response } from "express";
import { Controller, Get, Post, Patch, Put, Delete } from "../../../main/index";
import { Authenticate } from "../../../main/decorators/Authenticate";

@Controller("/")
export class SiteController {

    @Get("/")
    @Post("/")
    @Patch("/")
    @Put("/")
    @Delete("/")
    index(req: Request, res: Response) {
        res.send("OK");
    }

    @Get("/bad1")
    badFunc1(req: Request, res: Response) {
        throw new Error("Error was thrown");
    }

    @Get("/bad2")
    badFunc2(req: Request, res: Response) {
        return Promise.resolve().then(() => {
            console.log("Promise works");
            return Promise.reject(new Error("promise rejection"));
        });
    }

    @Post("/login")
    @Authenticate("local")
    login(req: Request, res: Response) {
        let user = req["user"];
        res.send();
    }
}