import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const role = searchParams.get("role") || "All";

    // Build where clause
    const where: any = {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };

    // Filter roles
    if (role === "All") {
      where.role = {
        in: ["student", "instructor"],
      };
    } else {
      where.role = role;
    }

    const users = await db.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await db.user.count({ where });

    return new Response(JSON.stringify({ users, total }), { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response("Server error", { status: 500 });
  }
}
