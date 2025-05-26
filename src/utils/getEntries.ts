export function getEntries<T>(formData: FormData) {
  return Object.fromEntries(Array.from(formData.entries())) as T;
}
