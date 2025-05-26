type SelectProps = {
  children: React.ReactNode;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({
  children,
  name,
  value,
  disabled,
  onChange,
}: SelectProps) {
  return (
    <select
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-600 block w-full p-3.5  flex-1"
    >
      {children}
    </select>
  );
}
