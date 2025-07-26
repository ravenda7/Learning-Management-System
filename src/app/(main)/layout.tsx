"use client";
import { ConfirmDialogProvider } from "@/context/confirm-dialog-context";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ConfirmDialogProvider>
   <SidebarProvider
    style={
      {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }
   >
    <AppSidebar variant="inset" />
    <SidebarInset>
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        {children}
      </div>
    </div>
    </SidebarInset>
   </SidebarProvider>
   </ConfirmDialogProvider>
  );
}