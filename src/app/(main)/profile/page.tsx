import ManageProfile from "@/components/shared/profile";
import { SiteHeader } from "@/components/sidebar/site-header";

export default function ProfilePage() {
  return (
    <>
      <SiteHeader title="Profile" />
      <div className="flex flex-col gap-4 py-4 md:gap-2 md:py-2">
        <div className="px-4 lg:px-6">
            <ManageProfile />
        </div>
      </div>
    </>
  );
}