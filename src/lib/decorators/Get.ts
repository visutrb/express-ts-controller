import { mapRequest } from "../core/manager";

export function Get(path: string) {
    return (target, propertyName: string) => {
        mapRequest(target, propertyName, "get", path);
    }
}