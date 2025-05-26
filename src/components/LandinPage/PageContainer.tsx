export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full w-full sticky flex flex-col bg-gradient-to-t from-indigo-600 to-cyan-400">
      {children}
    </div>
  );
}
