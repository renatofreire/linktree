import NextForm from "next/form";
import { ComponentProps, ReactNode } from "react";

type FormProps = {
  action: ComponentProps<typeof NextForm>["action"];
  children: ReactNode;
};

export function Root({ action, children }: FormProps) {
  return <NextForm action={action}>{children}</NextForm>;
}
