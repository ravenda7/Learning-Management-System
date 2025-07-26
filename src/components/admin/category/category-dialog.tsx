"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

const schema = z.object({
  name: z.string().min(1),
  id: z.string().optional(),
  description: z.string(),
})

type CategoryFormData = z.infer<typeof schema>

type Props = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValues?: {
    id?: string
    name: string
    description: string
  }
}

export default function CategoryDialog({ children, open, onOpenChange, defaultValues }: Props) {
  const isEdit = !!defaultValues?.id
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name || "",
      id: defaultValues?.id || "",
      description: defaultValues?.description || "",
    },
  })

  useEffect(() => {
    reset({
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
    })
  }, [defaultValues, reset])

  const mutation = useMutation({
    mutationFn: async (data: CategoryFormData) => {
        const url = isEdit ? `/api/admin/category/${defaultValues!.id}` : "/api/admin/category"
        const method = isEdit ? "PATCH" : "POST"

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to add category");
        }

       return res.json();

    },
    onSuccess: () => {
      toast(isEdit ? "Category Updated" : "Category created" )
      queryClient.invalidateQueries({ queryKey: ["category"] });
      onOpenChange(false)
      reset()
    },
    onError: (error: any) => {
      toast(error.message )
    },
  })

    const onSubmit = (data: CategoryFormData) => {
    mutation.mutate(data);
    };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update Category." : "Add a new Category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          <Input placeholder="Description" {...register("description")} />
          
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
