"use client";
import { useActionState, useEffect, useState } from "react";

import categoryAction from "@/app/(private)/admin/categoryAction";
import { Button } from "../Button";
import { NewLinkModal } from "./NewLinkModal";
import { NewCategoryModal } from "./NewCategoryModal";
import { createLinkAction } from "@/app/(private)/admin/linkAction";
import { useUser } from "@/context/userContext";

export default function AddContentForms() {
  const { addCategory, addLink } = useUser();

  const [categoryState, formCategoryAction, isCategoryPending] = useActionState(
    categoryAction,
    null
  );

  const [linkState, formLinkAction, isLinkPending] = useActionState(
    createLinkAction,
    null
  );

  const [showLinkForm, setShowLinkForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [linkFormFields, setLinkFormFields] = useState({
    title: "",
    url: "",
    active: true,
    categoryId: "",
  });

  const [categoryFormFields, setCategoryFormFields] = useState({
    title: "",
    active: true,
  });

  const handleCategoryFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setCategoryFormFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLinkFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    setLinkFormFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const onLinkModalClose = () => {
    setLinkFormFields({
      title: "",
      url: "",
      active: true,
      categoryId: "",
    });
    setShowLinkForm(false);
  };

  const onCategoryModalClose = () => {
    setCategoryFormFields({
      title: "",
      active: true,
    });

    setShowCategoryForm(false);
  };

  useEffect(() => {
    if (categoryState) {
      addCategory(categoryState);
      onCategoryModalClose();
    }
  }, [categoryState, addCategory]);

  useEffect(() => {
    if (linkState) {
      addLink(linkState);
      onLinkModalClose();
    }
  }, [linkState, addLink]);

  return (
    <div className="mt-4">
      <div className="flex flex-row gap-2">
        <Button
          variant="secondary"
          onClick={() => setShowCategoryForm(!showCategoryForm)}
        >
          Add new category
        </Button>
        <Button onClick={() => setShowLinkForm(!showLinkForm)}>
          Add new link
        </Button>
      </div>

      <NewLinkModal
        isVisible={showLinkForm}
        link={linkFormFields}
        buttonDisabled={isLinkPending}
        formAction={formLinkAction}
        onModalClose={onLinkModalClose}
        handleInputChange={handleLinkFormChange}
      />

      <NewCategoryModal
        formAction={formCategoryAction}
        buttonDisabled={isCategoryPending}
        isVisible={showCategoryForm}
        category={categoryFormFields}
        onModalClose={onCategoryModalClose}
        handleInputChange={handleCategoryFormChange}
      />
    </div>
  );
}
