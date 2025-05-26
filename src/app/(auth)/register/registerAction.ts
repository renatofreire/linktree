"use server";

import { createUser, findUserByEmail } from "@/services/user";
import { getEntries } from "@/utils/getEntries";
import { AuthUserInfo } from "@/types";

export default async function registerAction(formData: FormData) {
  const { name, userName, email, password } =
    getEntries<AuthUserInfo>(formData);

  if (!name || !userName || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = await findUserByEmail(email);

  if (user) {
    throw new Error("User already exists");
  }

  createUser({
    name,
    userName,
    email,
    password,
  });
}
