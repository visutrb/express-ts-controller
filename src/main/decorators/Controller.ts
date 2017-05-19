import { mapController } from "../core/manager";

export function Controller(baseUrl?: string) {
    return (target) => {
        mapController(baseUrl || "/", target);
    }
}