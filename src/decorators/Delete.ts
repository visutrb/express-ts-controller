import { addRequestMetadata } from "../core/manager";
import { RequestOptions } from "../interfaces/RequestOptions";

export function Delete(path?: string, options?: RequestOptions): MethodDecorator {
    return (target, propertyName) => addRequestMetadata({
        controllerName: target.constructor.name,
        functionName: propertyName as string,
        method: "delete",
        path: path || "",
        options: options
    });
}
