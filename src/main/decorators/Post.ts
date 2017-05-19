import { mapRequest } from "../core/manager";

export function Post(path: string) {
    return (target, propertyName: string) => {
        mapRequest("post", path, target, propertyName);
    }
}