import { mapRequest } from "../core/manager";

export function Put(path: string) {
    return (target, propertyName: string) => {
        mapRequest(target, propertyName, "put", path);
    }
}