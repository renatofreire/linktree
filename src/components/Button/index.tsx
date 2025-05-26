type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  name?: string;
  variant?: "primary" | "secondary";
  onClick: VoidFunction;
};

export const Button = ({
  children,
  disabled,
  name,
  type = "button",
  variant = "primary",
  onClick,
}: ButtonProps) => {
  const primaryClassName =
    "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:text-white";
  const secondaryClassName =
    "bg-white text-blue-500 border-blue-500 hover:bg-blue-100 ";

  const isPrimary = variant === "primary";
  return (
    <button
      className={`${
        isPrimary ? primaryClassName : secondaryClassName
      } rounded p-2 w-full border disabled:opacity-50 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      disabled={disabled}
      type={type}
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
