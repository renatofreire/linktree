"use server";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/category";
import { CategoryFormData } from "@/types";
import { getEntries } from "@/utils/getEntries";

export default async function categoryAction(
  _prevState: unknown,
  formData: FormData
) {
  const categoryEntries = getEntries<CategoryFormData>(formData);

  return await createCategory({
    ...categoryEntries,
    active: !!categoryEntries.active,
  });
}

export async function deleteCategoryAction(
  _prevState: unknown,
  formData: FormData
) {
  const categoryId = formData.get("categoryId") as string;

  return await deleteCategory(categoryId);
}

export async function updateCategoryAction(
  _prevState: unknown,
  formData: FormData
): Promise<CategoryFormData> {
  const categoryEntries = getEntries<CategoryFormData>(formData);

  return await updateCategory({
    ...categoryEntries,
    active: !!categoryEntries.active,
  });
}
