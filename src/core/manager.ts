import * as express from "express";
import * as glob from "glob";

import { RequestMetadata } from "../interfaces/RequestMetadata";

const routers = new Array<express.Router>();
const requestMetadatas = new Array<RequestMetadata>();

export function initialize(app: express.Application, targets: Array<new (...params: any[]) => any> | Array<string>) {
    for (const target of targets) {
        if (typeof target != "string") break;
        glob.sync(target).filter(item => !item.endsWith(".d.ts")).map(require);
    }

    for (const router of routers) {
        app.use(router);
    }
}

export function createRouter(target: Function, pathPrefix?: string) {
    const router = express.Router();
    const metadatas = requestMetadatas.filter(item => item.controllerName == target.name);
    for (const metadata of metadatas) {
        const path = (pathPrefix || "") + metadata.path;
        const method = metadata.method;
        const options = metadata.options;

        const Controller = target as new() => any;
        const functionName = metadata.functionName;

        const beforeAction = options ? options.beforeAction || [] : [];
        const afterAction = options ? options.afterAction || [] : [];
        const actionHandler: express.RequestHandler = async (req, res, next) => {
            let controller = new Controller();
            try {
                await controller[functionName](req, res, next);
            } catch (err) {
                next(err);
            } finally {
                controller = null;
            }
        };

        router[method](path, ...beforeAction, actionHandler, ...afterAction);
    }
    routers.push(router);
}

export function addRequestMetadata(metadata: RequestMetadata) {
    requestMetadatas.push(metadata);
}
