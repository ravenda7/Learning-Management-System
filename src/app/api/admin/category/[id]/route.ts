import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params  

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    const category = await db.category.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof z.ZodError ? error.issues : "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params 
  try {
    await db.category.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "category deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
