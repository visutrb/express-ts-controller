import { mapRequest } from "../core/manager";

export function Delete(path: string) {
    return (target, propertyName: string) => {
        mapRequest("delete", path, target, propertyName);
    }
}