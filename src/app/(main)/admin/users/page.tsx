import ManageUsers from "@/components/admin/users";
import { SiteHeader } from "@/components/sidebar/site-header";



export default function UsersPage() {
  return (
    <>
      <SiteHeader title="User Management" />
      <div className="py-4 px-4 lg:px-6 md:py-2">
        <ManageUsers />
      </div>
    </>
  );
}