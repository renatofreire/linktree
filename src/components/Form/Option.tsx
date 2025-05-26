type OptionProps = React.OptionHTMLAttributes<HTMLOptionElement> & {
  children: React.ReactNode;
};

export function Option({ children, ...props }: OptionProps) {
  return <option {...props}>{children}</option>;
}
