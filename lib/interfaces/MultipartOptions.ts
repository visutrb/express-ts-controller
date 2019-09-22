export interface MultipartOptions {
    uploadType: "single" | "array" | "fields" | "none" | "any";
    dest?: string;
    allowedMimeTypes?: string[];
    sizeLimit?: number;
    fieldName? :string;
    maxCount?: number;
}