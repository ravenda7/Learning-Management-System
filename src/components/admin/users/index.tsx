'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useConfirmDialog } from '@/context/confirm-dialog-context';
import { Ban, CheckCircle, Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination"
import { toast } from 'sonner';

export default function ManageUsers() {
    const queryClient = useQueryClient()
    const [filterRole, setFilterRole] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    const confirm = useConfirmDialog();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["users", filterRole, searchTerm, page],
        queryFn: async () => {
        const params = new URLSearchParams({
            role: filterRole,
            search: searchTerm,
            page: page.toString(),
            limit: limit.toString(),
        });

        const res = await fetch(`/api/admin/users?${params}`);
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
        },
    });

    const suspendUser = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
        const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
        });
        if (!res.ok) throw new Error("Failed to update status");
        return res.json();
    },
    onSuccess: () => {
        toast.success("User status updated");
        queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Failed to update user status"),
    });

    const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
        const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete user");
        return res.text();
    },
    onSuccess: () => {
        toast.success("User deleted");
        queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Failed to delete user"),
    });

    const users = data?.users || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);

    const handleDelete = async (userId: string, userName: string) => {
        const ok = await confirm({
            title: `Delete User "${userName}"`,
            description: "Are you sure you want to delete this user? This action cannot be undone.",
            confirmText: "Delete",
            cancelText: "Cancel",
        });
        if (ok) {
            deleteUser.mutate(userId);
        }
    };

    const handleSuspend = async (userId: string, isActive: boolean) => {
        const ok = await confirm({
            title: isActive ? "Suspend User" : "Activate User",
            description: `Are you sure you want to ${isActive ? "suspend" : "activate"} this user?`,
            confirmText: isActive ? "Suspend" : "Activate",
            cancelText: "Cancel",
        });
        if (ok) {
            suspendUser.mutate({ userId, isActive: !isActive });
        }
    };

  return (
    <div className="flex flex-col space-y-4">
      {/* Search and Role Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-x-4 gap-y-4 p-4 border border-gray-200 rounded-md">
        <div className="w-full relative">
          <Search className="absolute top-2 left-2 w-5 h-5" />
          <Input
            className="pl-9"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex items-center space-x-2">
          {["All", "student", "instructor"].map((role) => (
            <Button
              key={role}
              variant={filterRole === role ? "default" : "outline"}
              onClick={() => {
                setFilterRole(role);
                setPage(1);
              }}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* User List */}
      {isLoading ? (
        <p>Loading users...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load users.</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user: any) => (
            <Card key={user.id}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="no-image" />
                      <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge>{user.role}</Badge>
                        <Badge variant={user.isActive ? "isActive" : "destructive"}>
                            {user.isActive ? "Active" : "Suspended"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">0 Courses</p>
                    <p className="text-sm text-muted-foreground">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuspend(user.id, user.isActive)}
                      >
                        {user.isActive ? (
                            <>
                            <Ban className="h-4 w-4 mr-1" />
                            Suspend
                            </>
                        ) : (
                            <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Activate
                            </>
                        )}
                      </Button>
                      <Button
                       variant="destructive" 
                       size="sm"
                       onClick={() => handleDelete(user.id, user.name)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {data && (
        <Pagination>
          <PaginationContent className="flex justify-end w-full">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: Math.ceil(data.total / 3) }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) =>
                    prev < Math.ceil(data.total / 3) ? prev + 1 : prev
                  )
                }
                className={
                  page >= Math.ceil(data.total / 3)
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
