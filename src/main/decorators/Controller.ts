import { createRouter } from "../core/manager";

export function Controller(baseUrl?: string | string[]) {
    return (target) => {
        if (baseUrl == null)
            createRouter(target, ["/"]);
        else if (typeof (baseUrl) == "string")
            createRouter(target, [baseUrl]);
        else
            createRouter(target, baseUrl);
    }
}