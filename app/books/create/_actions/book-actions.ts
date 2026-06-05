"use server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { z } from "zod"

const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z
    .string()
    .min(1, "ISBN is required")
    .transform((v) => v.replace(/[-\s]/g, ""))
    .refine((v) => /^\d{13}$/.test(v), {
      message: "ISBN must be a valid ISBN-13",
    }),
  published: z.coerce.date().refine((d) => !isNaN(d.getTime()), {
    message: "Publishing date is required",
  }),
})

export async function createBook(values: unknown) {
  const data = createBookSchema.parse(values)
  console.log(data)

  const newBook = await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      published: data.published,
    },
  })

  return newBook
  //   redirect(`/books/${newBook.id}`)
}
