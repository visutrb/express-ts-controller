export interface RequestMapping {
    targetName;
    functionName: string;
    method: "get" | "post" | "patch" | "put" | "delete";
    path: string;
}