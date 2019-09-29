import { Request, Response } from "express";
import * as multer from "multer";
import * as path from "path";
import { Controller, Post } from "../../../src";

@Controller("/images")
export class ImagesController {

    @Post("/upload", {
        beforeAction: [ multer({ dest: path.join(__dirname, "../../uploads") }).single("image") ]
    })
    async uploadImage(req: Request, res: Response) {
        const uploadedFile = req.file;
        console.log(uploadedFile.location);
        res.status(201).send();
    }
}
