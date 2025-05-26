import { ComponentProps } from "react";
import NextForm from "next/form";

import { CategoryFormData } from "@/types";
import Modal from "../Modal";
import Form from "../Form";
import { Button } from "../Button";

type NewCategoryModalProps = {
  buttonDisabled?: boolean;
  formAction: ComponentProps<typeof NextForm>["action"];
  isVisible: boolean;
  category: CategoryFormData;
  onModalClose: VoidFunction;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function NewCategoryModal({
  buttonDisabled,
  formAction,
  isVisible,
  category,
  onModalClose,
  handleInputChange,
}: NewCategoryModalProps) {
  if (!isVisible) return null;

  return (
    <Modal onBackdropClick={onModalClose}>
      <Form.Title>Add new Category</Form.Title>
      <Form.Root action={formAction}>
        <div className="flex flex-row gap-2 items-center">
          {category.id && <input type="hidden" name="id" value={category.id} />}

          <Form.Input
            name="title"
            label="Title"
            value={category.title}
            onChange={handleInputChange}
          />

          <Form.Checkbox
            name="active"
            label="Active"
            checked={category.active}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row gap-2 mt-4">
          <Button onClick={onModalClose} variant="secondary">
            Cancel
          </Button>
          <Form.Submit disabled={buttonDisabled}>Save</Form.Submit>
        </div>
      </Form.Root>
    </Modal>
  );
}
