"use client";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditProfileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
})

type profileProps = {
    id: string;
    name: string;
    email: string;
}

type ProfileFormData = z.infer<typeof EditProfileSchema>

export default function EditProfileForm({id, name, email}: profileProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            name:  name || "",
            email: email ||"",
        },
    })
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: ProfileFormData) => {
            const response = await fetch(`/api/auth/me/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) {
                throw new Error("Failed to update profile")
            }
            return response.json()
        },
        onSuccess: () => {
          toast.success("Profile updated successfully")
          queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : "Failed to update profile")
        },
    })

    const onSubmit = (data: ProfileFormData) => {
        mutation.mutate(data)
    }
    return (
        <Card>
        <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Manage Your Profile here</CardDescription>
        </CardHeader>
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CardContent className="w-full space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input placeholder="Name" {...register("name")} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                <Label htmlFor="Email">Email</Label>
                <Input placeholder="Email" type="email" {...register("email")} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
        </CardContent>
        <CardFooter className="flex justify-end">
           <Button type="submit" disabled={mutation.isPending} className="cursor-pointer">
            {mutation.isPending ? "Updating..." : "Update"}
           </Button>
        </CardFooter>
        </form>
        </Card>
    )
}