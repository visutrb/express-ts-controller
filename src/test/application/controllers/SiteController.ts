import { Request, Response } from "express";

import { Controller } from "../../../main/decorators/Controller";
import { Delete } from "../../../main/decorators/Delete";
import { Put } from "../../../main/decorators/Put";
import { Patch } from "../../../main/decorators/Patch";
import { Post } from "../../../main/decorators/Post";
import { Get } from "../../../main/decorators/Get";
import { Authenticate } from "../../../main/decorators/Authenticate";

@Controller("/")
export class SiteController {

    @Get("/")
    getRequest(req: Request, res: Response) {
        res.send("GET");
    }

    @Post("/")
    postRequest(req: Request, res: Response) {
        res.send("POST");
    }

    @Patch("/")
    patchRequest(req: Request, res: Response) {
        res.send("PATCH");
    }

    @Put("/")
    putRequest(req: Request, res: Response) {
        res.send("PUT");
    }

    @Delete("/")
    deleteRequest(req: Request, res: Response) {
        res.send("DELETE");
    }

    @Post("/auth")
    @Authenticate({ strategies: ["custom"] })
    authenticate(req: Request, res: Response) {
        res.send("Authenticated");
    }
}
