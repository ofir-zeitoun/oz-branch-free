export type ObjectMapper<T extends {}, TDefault = undefined> = {
  [Key in keyof T]: T[Key];
} & Record<string, TDefault>;

export const objectMapper = <T extends {}, TDefault>(
  obj: T,
  defaultValue: TDefault
) => {
  return new Proxy<ObjectMapper<T, TDefault>>(obj, {
    get(target, prop) {
      return prop in target ? (target as any)[prop] : defaultValue;
    },
  });
};
