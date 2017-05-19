import { mapRequest } from "../core/manager";

export function Get(path: string) {
    return (target, propertyName: string) => {
        mapRequest("get", path, target, propertyName);
    }
}