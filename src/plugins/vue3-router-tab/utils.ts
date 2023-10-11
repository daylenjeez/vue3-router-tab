type StructureTypes =
  | "Object"
  | "Array"
  | "Function"
  | "String"
  | "Number"
  | "Boolean"
  | "Symbol";

export const isType = (type: StructureTypes) => {
  return (value: unknown) =>
    Object.prototype.toString.call(value) === `[object ${type}]`;
};

export const isFunction = (value: unknown): value is Function =>
  isType("Function")(value);

export const isString = (value: unknown): value is string =>
  isType("String")(value);

export const isNonEmptyString = (value: unknown): boolean => isString(value) && value !== "";

export const isObject = <T extends Record<string, any> = Record<string, any>>(value: unknown): value is T => isType("Object")(value) && value !== null;

export const throwError = (message: string) => {
  console.error(`[vue3-router-tab]: ${message}`);
  return void 0;
};

export const pick = <T extends object, K extends keyof T>(base: T, ...keys: K[]): Pick<T, K> => {
  const entries = keys.map(key => ([key, base[key]]));
  return Object.fromEntries(entries);
};
