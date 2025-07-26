'use client'
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  role: z.enum(["student", "instructor"], { error: "Role is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type UserFormData = z.infer<typeof schema>;

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<UserFormData>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: async (data: UserFormData) => {
            const response = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to sign up");
            }
            return response.json();
        },
        onSuccess: () => {
            reset();
            toast.success("User created successfully");
            router.push("/sign-in");
        },
        onError: (error:any) => {
            console.error("Sign up error:", error);
        },
    })

    const onSubmit = async (data: UserFormData) => {
        mutation.mutate(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <div className="space-y-2 flex-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("name")} placeholder="Enter your name" />
                    {errors.name && <p className="text-red-500 text-sm -mt-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2 flex-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="Enter your email" />
                    {errors.email && <p className="text-red-500 text-sm -mt-1">{errors.email.message}</p>}
                </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <div className="space-y-2 flex-1">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                    <Input {...register("password")}  type={showPassword ? "text" : "password"} placeholder="Enter your password" />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm -mt-1">{errors.password.message}</p>}
                </div>
                <div className="space-y-2 flex-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                    <Input  {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} placeholder="Enter confirm password"  />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
                    >
                        {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm -mt-1">{errors.confirmPassword.message}</p>}
                </div>
            </div>

            <Controller
            control={control}
            name="role"
            render={({ field }) => (
                <div className="space-y-1">
                <Label htmlFor="role">Create account as</Label>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    </SelectContent>
                </Select>
                {errors.role && <p className="text-red-500 text-sm -mt-1">{errors.role.message}</p>}
                </div>
            )}
            />
            <Button
            disabled={mutation.isPending}
            className="w-full"
            type="submit">
                {mutation.isPending ? "Signing up..." : "Sign Up"}
            </Button>
        </form>
    )
}