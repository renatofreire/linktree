import { ComponentProps } from "react";
import NextForm from "next/form";

import { useUser } from "@/context/userContext";
import { PublicLinkInfo } from "@/types";
import { Button } from "../Button";
import Modal from "../Modal";
import Form from "../Form";

type NewLinkModalProps = {
  isVisible: boolean;
  link: PublicLinkInfo;
  buttonDisabled?: boolean;
  formAction: ComponentProps<typeof NextForm>["action"];
  onModalClose: VoidFunction;
  handleInputChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

export function NewLinkModal({
  isVisible,
  link,
  buttonDisabled,
  formAction,
  onModalClose,
  handleInputChange,
}: NewLinkModalProps) {
  const { categories } = useUser();

  if (!isVisible) return null;

  return (
    <Modal onBackdropClick={onModalClose}>
      <Form.Title>Add new Link</Form.Title>

      <Form.Root action={formAction}>
        <div className="flex gap-2 items-center">
          {link.id && <input type="hidden" name="id" value={link.id} />}

          <Form.Input
            name="title"
            label="Title"
            value={link.title}
            onChange={handleInputChange}
          />
          {categories && categories?.length > 0 && (
            <Form.Select
              name="categoryId"
              value={link.categoryId || ""}
              onChange={handleInputChange}
            >
              <Form.Option defaultChecked value="">
                No category
              </Form.Option>
              {categories.map((category) => (
                <Form.Option key={category.id} value={category.id}>
                  {category.title}
                </Form.Option>
              ))}
            </Form.Select>
          )}
        </div>
        <div className="flex gap-2 items-center my-4">
          <Form.Input
            name="url"
            label="url"
            type="url"
            value={link.url}
            onChange={handleInputChange}
          />

          <Form.Checkbox
            name="active"
            label="Active"
            checked={link.active}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row gap-2">
          <Button onClick={onModalClose} variant="secondary">
            Cancel
          </Button>
          <Form.Submit disabled={buttonDisabled}>Save</Form.Submit>
        </div>
      </Form.Root>
    </Modal>
  );
}
