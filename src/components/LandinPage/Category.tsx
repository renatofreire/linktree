export default function Category({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex flex-col items-center w-full mb-8">
      {title && <p className="text-xl">{title}</p>}

      {children}
    </div>
  );
}
