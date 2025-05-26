"use server";

import { updateUser } from "@/services/user";
import { getEntries } from "@/utils/getEntries";

export default async function profileAction(
  _prevState: unknown,
  formData: FormData
) {
  try {
    const profileEntries = getEntries<{ bio: string }>(formData);

    return updateUser(profileEntries);
  } catch (error) {
    console.log(error);
  }
}
