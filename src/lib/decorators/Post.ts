import { mapRequest } from "../core/manager";

export function Post(path: string) {
    return (target, propertyName: string) => {
        mapRequest(target, propertyName, "post", path);
    }
}