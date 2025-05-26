export default function PageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center max-w-2xl w-full mx-auto py-16 px-4 md:px-0">
      {children}
    </div>
  );
}
