import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { name, email, password, role} = body;

        if (!name || !email || !password || !role) {
            return new Response("All fields are required", { status: 400 });
        }

        //check if email already exists
        const existingUser = await db.user.findUnique({
            where: { email: email}
        })
        if(existingUser) {
            return new Response("Email already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            }
        })
        return NextResponse.json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            }
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}