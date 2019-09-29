import { RequestOptions } from "./RequestOptions";

export interface RequestMetadata {
    controllerName: string;
    functionName: string;
    method: "get" | "post" | "patch" | "put" | "delete";
    path: string;
    options?: RequestOptions;
}
