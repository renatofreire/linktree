import Form from "next/form";

import registerAction from "./registerAction";

export default async function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-full max-w-7x items-center justify-center p-4">
      <div className="flex flex-col max-w-xl items-center justify-center">
        <h1 className="text-xl mb-4">Register</h1>
        <Form action={registerAction}>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          />
          <input
            type="text"
            name="userName"
            placeholder="userName"
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          />
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
          <button className="bg-blue-500 text-white rounded p-2 w-full">
            Register
          </button>
        </Form>
      </div>
    </div>
  );
}
