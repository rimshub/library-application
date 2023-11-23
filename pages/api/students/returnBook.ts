import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { studentId, bookId } = req.body;
    try {
      const existingBook = await prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

      if (!existingBook) {
        return res.status(404).json({ error: "Book not found" });
      }

      if (existingBook.issuedToId !== studentId) {
        return res.status(400).json({ error: "Book not issued to this student" });
      }

      // Return the book by setting issuedToId to null
      const returnedBook = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          issuedToId: null,
        },
      });

      res.json(returnedBook);
    } catch (error) {
      console.error("Error returning book:", error);
      res.status(500).json({ error: "Failed to return book" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
