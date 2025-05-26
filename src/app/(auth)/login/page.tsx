import LoginForm from "./loginForm";

export default async function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-full  items-center justify-center p-4">
      <h1 className="text-xl mb-4">Login</h1>
      <LoginForm />
    </div>
  );
}
