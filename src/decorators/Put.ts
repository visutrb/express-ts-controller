import { addRequestMetadata } from "../core/manager";
import { RequestOptions } from "../interfaces/RequestOptions";

export function Put(path?: string, options?: RequestOptions): MethodDecorator {
    return (target, propertyName) => addRequestMetadata({
        controllerName: target.constructor.name,
        functionName: propertyName as string,
        method: "put",
        path: path || "",
        options: options
    });
}
