'use client';
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function BackButton() {
    return (
        <Button
        variant="outline"
        className="rounded-none cursor-pointer"
            onClick={() => window.history.back()}
        >
            <ArrowLeft /> Back
        </Button>
    )
}