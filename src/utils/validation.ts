export class ValidationError extends Error {}

type KeyValue = {
  [key: string]: unknown;
};

export function titleValidator(body: KeyValue) {
  const { title, isActive } = body;
  if (typeof title === "string" && typeof isActive === "boolean")
    if (title.trim()) return { title: title.toString(), isActive };

  throw new ValidationError("The data provided is invalid");
}
