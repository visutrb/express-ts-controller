import { AuthenticationOptions } from "../interfaces/AuthenticationOptions";
import { mapRequestForAuthentication } from "../core/manager";

export function Authenticate(options: AuthenticationOptions) {
    return (target, propertyName: string) => {
        mapRequestForAuthentication(target, propertyName, options);
    }
}