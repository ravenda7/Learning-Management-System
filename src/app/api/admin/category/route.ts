import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { name, description } = body;

        if (!name || !description) {
            return new Response("Name and description are required", { status: 400 });
        }
        // Check if category already exists
        const category = name.toLowerCase().trim();
        const existingCategory = await db.category.findUnique({
            where: { name: category }
        });

        if (existingCategory) {
            return NextResponse.json(
                { error: "Category already exists" },
                { status: 400 }
            );
        }


        // Create new category
        const newCategory = await db.category.create({
            data: {
                name: category,
                description: description,
            }
        });
        return NextResponse.json({
            message: "Category created successfully",
            category: {
                id: newCategory.id,
                name: newCategory.name,
                description: newCategory.description,
            }
        }, { status: 201 });
    } catch (error) {
         console.error("Create Category Error:", error);
        return new Response("Server error", { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        const { searchParams }  = new URL(req.url);
        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        const where = {
            name: {
                contains: search,
                mode: 'insensitive' as const,
            }
        };

        const [categories, total] = await Promise.all([
            db.category.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            db.category.count({ where }),
        ]);
        return NextResponse.json({ categories, total }, { status: 200 });
    } catch (error) {
        console.error("Get Categories Error:", error);
        return new Response("Server error", { status: 500 });
    }
}