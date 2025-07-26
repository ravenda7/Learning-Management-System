"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useConfirmDialog } from "@/context/confirm-dialog-context"
import { toast } from "sonner"
import { Search, SquarePen, Trash2 } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination"
import CategoryDialog from "./category-dialog"


type Category = {
  id: string
  name: string
  description: string
}

export default function ManageCategories() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
   const confirm = useConfirmDialog();

  const { data, isLoading } = useQuery({
    queryKey: ["category", search, page],
    queryFn: async () => {
      const res = await fetch(`/api/admin/category?search=${search}&page=${page}&limit=5`)
      return res.json()
    },
  })

  console.log("Category Data:", data)

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/category/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] })
      toast.success("Category deleted successfully")
    },
  })

  const handleDelete = async (id:string, name:string) => {
    const ok = await confirm({
      title: `Delete "${name}"`,
      description: "Are you sure you want to delete this category? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (ok) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="w-full relative">
          <Search className="absolute top-2 left-2" />
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-9"
        />
        </div>
        <CategoryDialog open={openDialog} onOpenChange={setOpenDialog} defaultValues={selectedCategory ?? undefined}>
          <Button onClick={() => { setSelectedCategory(null); setOpenDialog(true) }}>
            Add Category
          </Button>
        </CategoryDialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>
          ) : (
            data?.categories?.map((category: Category, index:number) => (
              <TableRow key={category.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="truncate max-w-[200px]">{category.description}</TableCell>
                <TableCell className="text-right space-x-2">
                  <CategoryDialog
                    open={openDialog && selectedCategory?.id === category.id}
                    onOpenChange={(open: boolean) => {
                      setOpenDialog(open)
                      if (!open) setSelectedCategory(null)
                    }}
                    defaultValues={category}
                  >
                    <Button variant="icon"
                     className="hover:text-sky-600"
                     onClick={() => { setSelectedCategory(category); setOpenDialog(true) }}>
                      <SquarePen />
                    </Button>
                  </CategoryDialog>
                  <Button
                    variant="icon"
                    onClick={() => handleDelete(category.id, category.name)}
                  >
                     <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
          {!data?.categories?.length && !isLoading && (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-[120px] font-semibold text-gray-600">
                No category found
              </TableCell>
            </TableRow>
            )}
        </TableBody>
      </Table>

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
  )
}
