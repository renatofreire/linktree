import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import Header from "@/components/Header";
import { UserProvider } from "@/context/userContext";
import { getLoggedUser } from "@/services/user";
import { getAllCategories } from "@/services/category";
import { getAllLinks } from "@/services/link";

type Props = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await getLoggedUser();
  if (!user) {
    redirect("/login");
  }

  const categories = await getAllCategories();
  const links = await getAllLinks();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <UserProvider data={{ user, categories, links }}>{children}</UserProvider>
    </div>
  );
}
