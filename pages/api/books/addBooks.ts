import prisma from "../../../prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, image, authorId, issuedToId} = req.body
    const newBook = await prisma.book.create({
        data: {
            title,
            image,
            authorId,
            issuedToId
        }
    })
    if (issuedToId) {
      await prisma.student.update({
        where: { id: issuedToId },
        data: {
          issuedBooks: {
            connect: { id: newBook.id },
          },
        },
      });
    }
    res.json(newBook)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}