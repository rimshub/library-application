import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { authorId } = req.body;
    try {
      const deleteAuthor = await prisma.author.delete({
        where: {
          id: authorId,
        },
      });
      res.json(deleteAuthor);
    } catch (error) {
      console.error("Error deleting author:", error);
      res.status(500).json({ error: "Failed to delete author" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
