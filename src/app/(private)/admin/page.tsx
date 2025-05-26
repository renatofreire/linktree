import Panel from "@/components/Panel";
import Preview from "@/components/Preview";

export default function Admin() {
  return (
    <div className="flex grow w-full max-w-7xl m-auto">
      <div className="grid grid-cols-1 grow md:grid-cols-[1fr_400px]">
        <Panel />
        <Preview />
      </div>
    </div>
  );
}
