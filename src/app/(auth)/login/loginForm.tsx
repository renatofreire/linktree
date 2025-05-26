"use client";

import Form from "next/form";
import { useActionState } from "react";

import loginAction from "./loginAction";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <>
      {!state?.success && <p className="text-red-500">{state?.message}</p>}

      <Form action={formAction}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />

        <button
          className="bg-blue-500 text-white rounded p-2 w-full disabled:opacity-50"
          disabled={isPending}
        >
          sign in
        </button>
      </Form>
    </>
  );
}
