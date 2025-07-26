"use client";
import { useQuery } from "@tanstack/react-query";

export function useFetchProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
  });
}
