export type ObjectMapper<T extends {}, TDefault = undefined> = {
    [Key in keyof T]: T[Key];
} & Record<string, TDefault>;
export declare const objectMapper: <T extends {}, TDefault>(obj: T, defaultValue: TDefault) => ObjectMapper<T, TDefault>;
