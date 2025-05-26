"use client";

import Form from "next/form";
import logoutAction from "./logoutAction";
import { PublicUserInfo } from "@/types";

export default function Header({ user }: { user: PublicUserInfo | null }) {
  return (
    <header className="flex items-center justify-center p-4 bg-gray-800 text-white">
      <div className="flex items-center justify-between w-full max-w-7xl ">
        <span>LinkTree</span>
        <Form action={logoutAction}>
          <button title="Sign out" className={"cursor-pointer"}>
            {user?.userName}
          </button>
        </Form>
      </div>
    </header>
  );
}
