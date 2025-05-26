import { useActionState, useEffect, useState } from "react";
import { FiEdit, FiExternalLink, FiTrash2 } from "react-icons/fi";
import NextForm from "next/form";

import { PublicLinkInfo } from "@/types";
import { useUser } from "@/context/userContext";
import {
  deleteLinkAction,
  updateLinkAction,
} from "@/app/(private)/admin/linkAction";
import ActiveIcon from "../ActiveIcon";
import ActionButton from "../ActionButton";
import { NewLinkModal } from "../AddContentForms/NewLinkModal";

type LinkProps = {
  link: PublicLinkInfo;
};

export default function Link({ link }: LinkProps) {
  const { removeLink, updateLink } = useUser();

  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkFormFields, setLinkFormFields] = useState(link);

  const [deleteLinkState, deleteLinkFormData, isDeletePending] = useActionState(
    deleteLinkAction,
    null
  );

  const [updateLinkState, updateLinkFormData, isUpdatePending] = useActionState(
    updateLinkAction,
    null
  );

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

  useEffect(() => {
    if (deleteLinkState) {
      removeLink(deleteLinkState);
    }
  }, [deleteLinkState, removeLink]);

  useEffect(() => {
    if (updateLinkState) {
      updateLink(updateLinkState);
    }
    setShowLinkForm(false);
  }, [updateLinkState, updateLink]);

  return (
    <div className="flex gap-2 items-center justify-between mb-4 p-4 rounded bg-stone-100 hover:bg-stone-200">
      <div className="flex gap-2 items-center">
        <ActiveIcon isActive={link.active} />
        <div className="ml-2">
          <p className="font-bold text-gray-700">{link.title}</p>
          <a target="_blank" href={link.url}>
            <span className="flex gap-2 items-center text-teal-700 py-2">
              {link.url} <FiExternalLink />
            </span>
          </a>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <NextForm action={deleteLinkFormData}>
          <ActionButton
            inputName="linkId"
            inputValue={link.id}
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
            setShowLinkForm(true);
          }}
        >
          <FiEdit className="cursor-pointer text-blue-600 hover:text-blue-900" />
        </ActionButton>
      </div>

      <NewLinkModal
        isVisible={showLinkForm}
        link={linkFormFields}
        buttonDisabled={isUpdatePending}
        formAction={updateLinkFormData}
        onModalClose={onLinkModalClose}
        handleInputChange={handleLinkFormChange}
      />
    </div>
  );
}
