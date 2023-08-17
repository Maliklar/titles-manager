import { ValidationError, titleValidator } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

function response(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) return response("Invalid Data", 400);
  if (isNaN(+id)) return response("Invalid Data", 400);
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();

    await prisma.titles.update({
      where: {
        id: +id,
      },
      data: {
        isDeleted: true,
      },
    });
    await prisma.$disconnect();

    return response("Deleted successfully", 200);
  } catch (error) {
    return response(`Internal Server Error: message}`, 500);
  }
}
