import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

type Props = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const session = await auth();

  if (session) {
    redirect("/admin");
  }

  return <div>{children}</div>;
}
