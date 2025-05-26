import { FiAlertOctagon } from "react-icons/fi";
import Page from "@/components/LandinPage";

export default async function NotFound() {
  return (
    <div className="flex min-h-screen max-w-full">
      <Page.Container>
        <Page.Content>
          <div className="flex flex-col items-center justify-center">
            <FiAlertOctagon className="text-9xl text-white" />
            <p className="text-2xl text-white my-4">Page not found</p>
          </div>
        </Page.Content>
      </Page.Container>
    </div>
  );
}
