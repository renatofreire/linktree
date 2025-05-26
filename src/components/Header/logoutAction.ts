"use server";

import { signOut } from "@/auth";

export default async function logoutAction() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
