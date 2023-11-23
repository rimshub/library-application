import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.body;
    try {
      const newStudent = await prisma.student.create({
        data: {
          name,
        },
      });
      res.json(newStudent);
    } catch (error) {
      console.error("Error adding student:", error);
      res.status(500).json({ error: "Failed to add student" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
