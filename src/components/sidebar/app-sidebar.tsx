"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Sticker, ChartBarStacked, LibraryBig } from 'lucide-react';
import { NavMain } from "./nav-main";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "../shared/loader";
import { useFetchProfile } from "@/hooks/use-fetch-profile";


const data = {
  adminNav: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "All Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Category",
      url: "/admin/category",
      icon: ChartBarStacked,
    }
  ],

  instructorNav: [
    {
      title: "Dashboard",
      url: "/instructor/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      url: "/instructor/courses",
      icon: LibraryBig,
    },
    {
      title: "Quizzes",
      url: "/instructor/quizzes",
      icon: Sticker,
    }
  ],

  studentNav: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      url: "/student/courses",
      icon: LibraryBig,
    },
  ],
}

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: profile, isLoading } = useFetchProfile();
  const router = useRouter();

  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user) {
      router.push("/");
    }
  }, [session, status, router]);

  if (!session || !session.user || !profile) {
    return null;
  }

  const userRole = session.user.role;
  let navItems: NavItem[] = [];

  if (userRole === "admin") {
    navItems = data.adminNav;
  } else if (userRole === "instructor") {
    navItems = data.instructorNav;
  } else if (userRole === "student") {
    navItems = data.studentNav;
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-12"
            >
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-4"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-sm text-center px-3 py-2">
                  <span className="text-white text-2xl font-bold">NL</span>
                </div>
                <div className="flex flex-col gap-1">
                <h2 className="text-gray-950 font-semibold text-lg">NetupLMS</h2>
                <Badge variant="secondary" className="text-[10px]">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
                </Badge>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        { isLoading ? (
          <Loader />
        )
        :(
        <NavUser
          user={{
            name: profile.name ?? "",
            email: profile.email ?? "",
            avatar: profile.name ?? "",
          }}
        />)}
      </SidebarFooter>
    </Sidebar>
  );
}