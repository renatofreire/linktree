type ActionButtonProps = {
  children: React.ReactNode;
  inputName?: string;
  inputValue?: string;
  disabled?: boolean;
  acessibilityLabel: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function ActionButton({
  children,
  inputName,
  inputValue,
  disabled,
  acessibilityLabel,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="submit"
      name={inputName}
      value={inputValue}
      disabled={disabled}
      className="py-0.5 px-3 cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {children}
      <span className="sr-only">{acessibilityLabel}</span>
    </button>
  );
}
