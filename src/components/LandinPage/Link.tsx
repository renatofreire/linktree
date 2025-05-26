export default function Link({
  url,
  title,
  variant = "default",
}: {
  url?: string;
  title?: string;
  variant?: "default" | "outlined";
}) {
  const style =
    variant === "default"
      ? "bg-white hover:bg-transparent hover:text-white"
      : "text-white hover:text-black hover:bg-white";
  return (
    <div className="w-full">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex w-full justify-center p-3 my-2 border-2 rounded-4xl border-white transition duration-300 ease-in-out ${style}`}
      >
        {title}
      </a>
    </div>
  );
}
