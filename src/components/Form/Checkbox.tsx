type CheckboxProps = {
  name?: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  name,
  checked,
  label,
  disabled = false,
  onChange,
}: CheckboxProps) {
  return (
    <label className={`flex cursor-pointer`}>
      <input
        type="checkbox"
        name={name}
        disabled={disabled}
        checked={checked}
        className="sr-only peer"
        onChange={onChange}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] peer-disabled:opacity-10 peer-disabled:cursor-not-allowed after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
      <span className="ms-3 text-sm font-medium text-gray-900 ">{label}</span>
    </label>
  );
}
