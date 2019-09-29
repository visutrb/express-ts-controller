import { createRouter } from "../core/manager";

export function Controller(baseUrl?: string): ClassDecorator {
    return (target) => createRouter(target, baseUrl);
}
