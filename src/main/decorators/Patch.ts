import { mapRequest } from "../core/manager";
export function Patch(path: string) {
    return (target, propertyName: string) => {
        mapRequest("patch", path, target, propertyName);
    }
}