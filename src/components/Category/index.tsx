import { useActionState, useEffect, useState } from "react";
import NextForm from "next/form";
import { FiTrash2, FiEdit } from "react-icons/fi";

import {
  updateCategoryAction,
  deleteCategoryAction,
} from "@/app/(private)/admin/categoryAction";
import { PublicCategoryInfo } from "@/types";
import { useUser } from "@/context/userContext";
import ActionButton from "../ActionButton";
import { NewCategoryModal } from "../AddContentForms/NewCategoryModal";
import ActiveIcon from "../ActiveIcon";
import Link from "../Link";

export default function Category({
  category,
}: {
  category: PublicCategoryInfo;
}) {
  const { removeCategory, updateCategory, links } = useUser();

  const [categoryFormFields, setCategoryFormFields] = useState(category);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const onCategoryModalClose = () => {
    setShowCategoryForm(false);
  };

  const handleCategoryFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setCategoryFormFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [stateDelete, deleteFormAction, isDeletePending] = useActionState(
    deleteCategoryAction,
    null
  );

  const [stateUpdate, updateFormAction, isUpdatePending] = useActionState(
    updateCategoryAction,
    null
  );

  useEffect(() => {
    if (stateDelete?.deleted) {
      removeCategory(stateDelete.id);
    }
  }, [stateDelete, removeCategory]);

  useEffect(() => {
    if (stateUpdate?.id) {
      updateCategory(stateUpdate);
      setShowCategoryForm(false);
    }
  }, [stateUpdate, updateCategory]);

  const categoryLinks = links?.filter(
    (link) => link.categoryId === category.id
  );

  return (
    <div className="border border-blue-200 rounded mt-4 bg-blue-50">
      <div className="flex items-center bg-blue-100 font-bold px-4 py-2">
        <div className="flex items-center flex-1 gap-1">
          <ActiveIcon isActive={category.active} />

          <p className="font-bold text-lg">{category.title}</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <NextForm action={deleteFormAction}>
            <ActionButton
              inputName="categoryId"
              inputValue={category.id}
              disabled={isDeletePending}
              acessibilityLabel="Delete"
            >
              <FiTrash2 className="cursor-pointer text-red-400 hover:text-red-600" />
            </ActionButton>
          </NextForm>

          <ActionButton
            inputName="editCategory"
            acessibilityLabel="Edit"
            onClick={() => {
              setShowCategoryForm(true);
            }}
          >
            <FiEdit className="cursor-pointer text-blue-600 hover:text-blue-900" />
          </ActionButton>
        </div>
      </div>
      <div className="p-4">
        <div>
          {categoryLinks?.map((link) => {
            if (link.categoryId !== category.id) return null;
            return <Link key={link.id} link={link} />;
          })}
        </div>

        {(categoryLinks?.length || 0) === 0 && (
          <p className="text-gray-500 text-sm">
            No links available in this category.
          </p>
        )}
      </div>
      <NewCategoryModal
        formAction={updateFormAction}
        buttonDisabled={isUpdatePending}
        isVisible={showCategoryForm}
        category={categoryFormFields}
        onModalClose={onCategoryModalClose}
        handleInputChange={handleCategoryFormChange}
      />
    </div>
  );
}
