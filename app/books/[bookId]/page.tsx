import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookAlert, BookDashed } from "lucide-react"

async function BookDetailsPage(props: PageProps<"/[bookId]">) {
  const params = await props.params

  if (!params.bookId) notFound()

  const book = await prisma.book.findUnique({
    where: { id: params.bookId },
  })

  if (!book) notFound()

  return (
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="mb-10 text-center text-4xl font-bold">{book.title}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="mx-auto flex max-w-prose flex-col items-start justify-center space-y-4 md:mx-0">
          <p className="text-2xl">Author: {book.author}</p>
          <p className="text-2xl">ISBN: {book.isbn}</p>
          <p className="text-2xl">
            Published: {book.published.toLocaleDateString()}
          </p>
          <p>Uploaded: {book.createdAt.toLocaleDateString()}</p>
          <p>Updated: {book.updatedAt.toLocaleDateString()}</p>
        </div>

        <div className="flex justify-center">
          <div className="rounded-lg bg-muted">
            <img
              src="https://placehold.net/400x600.png"
              alt="Placeholder image"
              className="w-full max-w-[200px] rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button asChild className="" variant="destructive">
          <Link href="#">
            Delete book
            <BookAlert />
          </Link>
        </Button>
        <Button asChild className="">
          <Link href="#">
            Edit Book
            <BookDashed />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default BookDetailsPage
