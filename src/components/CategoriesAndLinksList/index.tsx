"use client";

import { useUser } from "@/context/userContext";
import Category from "../Category";
import Link from "../Link";

export function CategoriesAndLinksList() {
  const { categories, links } = useUser();

  const linksWithoutCategory = links?.filter((link) => !link.categoryId);

  return (
    <div>
      {(categories?.length || 0) > 0 ? (
        categories?.map((category) => (
          <Category key={category.id} category={category} />
        ))
      ) : (
        <div className="flex gap-2 mt-8">
          <p className="text-lg text-gray-700">No categories available.</p>
        </div>
      )}

      {(linksWithoutCategory?.length || 0) > 0 && (
        <div className="mt-8">
          <p className="text-lg font-bold text-gray-800 mb-4">
            Links without Category
          </p>

          {linksWithoutCategory?.map((link) => (
            <Link key={link.id} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}
