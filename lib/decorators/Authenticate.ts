import { AuthenticationOptions } from "../interfaces/AuthenticationOptions";
import { authenticateRequest } from "../core/manager";

export function Authenticate(option: string | AuthenticationOptions) {
    return (target, propertyName: string) => {
        if (typeof option == "string")
            authenticateRequest(target, propertyName, [<string> option]);
        else
            authenticateRequest(target, propertyName, (<AuthenticationOptions> option).strategies);
    }
}