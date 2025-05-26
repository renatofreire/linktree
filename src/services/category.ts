import db from "@/lib/db";
import { Category, CategoryFormData, PublicCategoryInfo } from "@/types";
import { getCurrentSession } from "./user";

export async function createCategory(
  category: CategoryFormData
): Promise<Category> {
  const { userId } = await getCurrentSession();

  return await db.category.create({
    data: {
      title: category.title,
      active: category.active,
      userId,
    },
  });
}

export async function deleteCategory(
  categoryId: string
): Promise<PublicCategoryInfo & { deleted: boolean }> {
  await getCurrentSession();

  const deleted = await db.category.update({
    where: { id: categoryId },
    data: { deleted: true },
  });

  return {
    id: deleted.id,
    title: deleted.title,
    active: deleted.active,
    deleted: deleted.deleted,
  };
}

export async function updateCategory(category: CategoryFormData) {
  await getCurrentSession();

  const updatedCategory = await db.category.update({
    where: { id: category.id },
    data: {
      title: category.title,
      active: !!category.active,
    },
  });

  return {
    id: updatedCategory.id,
    title: updatedCategory.title,
    active: updatedCategory.active,
  };
}

export async function getAllCategories(): Promise<PublicCategoryInfo[] | null> {
  const { userId } = await getCurrentSession();

  const categories = await db.category.findMany({
    where: {
      userId,
      deleted: false,
    },
    orderBy: {
      order: "asc",
    },
  });

  return categories?.map((category) => ({
    id: category.id,
    title: category.title,
    active: category.active,
  }));
}

export async function findCategoriesByUserName(
  userName: string
): Promise<PublicCategoryInfo[] | null> {
  const categories = await db.category.findMany({
    where: {
      user: {
        userName: userName,
      },
      deleted: false,
      active: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return categories?.map((category) => ({
    id: category.id,
    title: category.title,
    active: category.active,
  }));
}
