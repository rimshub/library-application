import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { studentId, bookId } = req.body;
    try {
      // Check if the book exists and if it's available
      const existingBook = await prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

      if (!existingBook) {
        return res.status(404).json({ error: "Book not found" });
      }

      if (existingBook.issuedToId !== null) {
        return res.status(400).json({ error: "Book is already issed by a other student" });
      }

      // Issue the book to the student
      const issuedBook = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          issuedToId: studentId,
        },
      });

      res.json(issuedBook);
    } catch (error) {
      console.error("Error issuing book:", error);
      res.status(500).json({ error: "Failed to issue book" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
