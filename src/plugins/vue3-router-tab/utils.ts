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

export const throwError = (message: string) => {
  console.error(`[vue3-router-tab]: ${message}`);
};
