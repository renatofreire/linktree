"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { Credentials } from "@/types";
import { getEntries } from "@/utils/getEntries";

export default async function loginAction(
  _prevState: unknown,
  formData: FormData
) {
  try {
    const credendtialsEntries = getEntries<Credentials>(formData);

    await signIn("credentials", {
      ...credendtialsEntries,
      redirect: true,
      redirectTo: "/admin",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid login" };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }
    throw error;
  }
}
