
// import { getServerSession } from "next-auth";
// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import { authOptions } from "@/lib/auth";

// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user?.id) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const profile = await db.user.findUnique({
//     where: { id: parseInt(session.user.id) },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       role: true,
//     },
//   });

//   if (!profile) {
//     return new NextResponse("profile not found", { status: 404 });
//   }

//   return NextResponse.json(profile);
// }









import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions }); // ✅ Fix here

  if (!session || !session.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const profile = await db.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!profile) {
    return new NextResponse("Profile not found", { status: 404 });
  }

  return NextResponse.json(profile);
}
