import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params  
    try {
      const userId = parseInt(id);
      const body = await req.json();
      const { isActive } = body;

      const updatedUser = await db.user.update({
        where: { id: userId },
        data: { isActive },
      });

      return NextResponse.json({ user: updatedUser }, { status: 200 });
    } catch (error) {
      console.error("Suspend error:", error);
      return new Response("Failed to update user status", { status: 500 });
    }
}



export async function DELETE(
  _req: NextRequest,
   context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
  try {
    const userId = parseInt(id);

    await db.user.delete({ where: { id: userId } });

    return new Response("User deleted", { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response("Failed to delete user", { status: 500 });
  }
}

