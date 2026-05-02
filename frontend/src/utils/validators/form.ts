import { z } from "zod";

export const getSchemaError = (schema: z.ZodTypeAny, value: unknown) => {
  const result = schema.safeParse(value);
  if (result.success) return null;
  return result.error.issues[0]?.message ?? "Invalid value";
};

export const getRequiredSchemaError = (
  schema: z.ZodTypeAny,
  value: unknown,
  requiredMessage: string
) => {
  if (typeof value === "string" && value.trim() === "") return requiredMessage;
  if (value === null || value === undefined) return requiredMessage;
  return getSchemaError(schema, value);
};
