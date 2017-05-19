import * as passport from "passport";

import { Express } from "express";
import { AuthenticationOptions } from "../interfaces/AuthenticationOptions";

let _app: Express;
let _requestMappings = new Array();
let _requestAuthentications = new Array();

export function initialize(app: Express, targets: Array<any>) {
    _app = app;
    for (let target of targets) {
        let controller = new target();

        for (let mapping of _requestMappings) {

            if (mapping.target == target.name) {
                route(mapping, controller);
            }
        }
    }
}

export function mapController(baseUrl: string, target) {
    for (let mapping of _requestMappings) {
        if (mapping.target == target.name) {
            mapping.baseUrl = baseUrl;
        }
    }
}

export function mapRequest(method: "get" | "post" | "patch" | "put" | "delete", path: string, target, propertyName: string) {
    _requestMappings.push({
        method: method,
        path: path,
        target: target.constructor.name,
        propertyName: propertyName
    });
}

export function mapRequestForAuthentication(target, propertyName: string, options: AuthenticationOptions) {
    _requestAuthentications.push({
        target: target,
        propertyName: propertyName,
        strategies: options.strategies
    });
}

function route(mapping, controller) {
    let propertyName = mapping.propertyName;
    let method = mapping.method;
    let baseUrl = mapping.baseUrl;
    let path = mapping.path;
    let authenticationStrategies: Array<string> = null;

    if (baseUrl != "/") {
        if (path == "/") {
            path = baseUrl;
        } else {
            path = baseUrl + path;
        }
    }

    for (let requestAuthentication of _requestAuthentications) {
        if (requestAuthentication.target.constructor.name == mapping.target &&
            requestAuthentication.propertyName == propertyName) {
            authenticationStrategies = requestAuthentication.strategies;
        }
    }

    if (authenticationStrategies == null) {
        _app[method](path, (req, res, next) => {
            controller[propertyName](req, res, next);
        });
    } else {
        _app[method](path, passport.authenticate(authenticationStrategies), (req, res, next) => {
            controller[propertyName](req, res, next);
        });
    }
}
