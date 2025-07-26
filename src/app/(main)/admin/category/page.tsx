import ManageCategories from "@/components/admin/category";
import { SiteHeader } from "@/components/sidebar/site-header";

export default function CategoryManagement() {
    
    return (
        <>
        <SiteHeader title="Category Management" />
        <div className="py-4 px-4 lg:px-6 md:py-2">
            <ManageCategories />
        </div>
        </>
    )
}