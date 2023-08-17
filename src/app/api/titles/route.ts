import { ValidationError, titleValidator } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

function response(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}
export async function GET(request: Request) {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();

    const result = await prisma.titles.findMany({
      where: {
        isDeleted: false,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({ data: result }, { status: 400 });
  } catch (error) {
    return response(`Internal Server Error: ${(error as Error).message}`, 500);
  }
}
export async function PATCH(request: Request) {
  const body = await request.json();
  if (!body.id) return response("Invalid Data", 400);
  try {
    const { title, isActive } = titleValidator(body);

    const prisma = new PrismaClient();
    await prisma.$connect();

    await prisma.titles.update({
      where: { id: body.id },
      data: {
        ...(title ? { title } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
      },
    });

    await prisma.$disconnect();

    return response("Deleted successfully", 200);
  } catch (error) {
    if (error instanceof ValidationError)
      return response(`Bad Request: ${error.message}`, 400);

    return response(`Internal Server Error: message}`, 500);
  }
}
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const { title, isActive } = titleValidator(body);
    const prisma = new PrismaClient();
    await prisma.$connect();

    await prisma.titles.create({
      data: { isActive, title },
    });

    await prisma.$disconnect();

    return response("Data inserted successfully: ", 200);
  } catch (error) {
    if (error instanceof ValidationError)
      return response(`Bad Request: ${error.message}`, 400);
    return response(`Internal Server Error: ${(error as Error).message}`, 500);
  }
}
