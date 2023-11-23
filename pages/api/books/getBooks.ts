import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        issuedTo: true,

      },
    });
    res.json(books);
    console.log(books);
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
}
