import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export function Title({ children }: TitleProps) {
  return <p className="text-xl font-bold text-gray-900 mb-4">{children}</p>;
}
