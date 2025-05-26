"use server";

import { createLink, deleteLink, updateLink } from "@/services/link";
import { PublicLinkInfo } from "@/types";
import { getEntries } from "@/utils/getEntries";

export async function createLinkAction(
  _prevState: unknown,
  formData: FormData
) {
  const linkEntries = getEntries<PublicLinkInfo>(formData);

  return await createLink({
    ...linkEntries,
    active: !!linkEntries.active,
    categoryId: linkEntries.categoryId || null,
  });
}

export async function deleteLinkAction(
  _prevState: unknown,
  formData: FormData
) {
  const linkId = formData.get("linkId") as string;

  return await deleteLink(linkId);
}

export async function updateLinkAction(
  _prevState: unknown,
  formData: FormData
) {
  const linkEntries = getEntries<PublicLinkInfo>(formData);

  return await updateLink({
    ...linkEntries,
    active: !!linkEntries.active,
    categoryId: linkEntries.categoryId || null,
  });
}
