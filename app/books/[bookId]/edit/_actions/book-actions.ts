"use server"

import prisma from "@/lib/prisma"
import { z } from "zod"

const editBookSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),

  isbn: z
    .string()
    .min(1, "ISBN is required")
    .transform((v) => v.replace(/[-\s]/g, ""))
    .refine((v) => /^\d{13}$/.test(v), {
      message: "ISBN must be a valid ISBN-13",
    }),

  published: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine((d) => !isNaN(d.getTime()), {
      message: "Publishing date is required",
    })
  ),
})

export async function editBook(values: z.infer<typeof editBookSchema>) {
  const data = editBookSchema.parse(values)

  const updatedBook = await prisma.book.update({
    where: { id: data.id },
    data: {
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      published: new Date(data.published), //This needs to change
    },
  })

  return updatedBook
}
