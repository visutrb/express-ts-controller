import { RequestHandler } from "express";

export interface RequestOptions {
    beforeAction?: RequestHandler[];
    afterAction?: RequestHandler[];
}
