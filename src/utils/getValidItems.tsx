export function getValidItems<T>({
  list,
  param,
  value,
}: {
  list: T[];
  param: keyof T;
  value: unknown;
}) {
  return list.filter((item) => item[param] === value) as T[];
}
