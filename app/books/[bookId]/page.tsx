import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookDashed } from "lucide-react"
import { DeleteBookButton } from "./_components/delete-book-button"

async function BookDetailsPage(props: PageProps<"/books/[bookId]">) {
  const params = await props.params

  if (!params.bookId) notFound()

  const book = await prisma.book.findUnique({
    where: { id: params.bookId },
  })

  if (!book) notFound()

  return (
    // Should remake this entire thing into a card component instead
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="mb-10 text-2xl font-bold md:text-center">{book.title}</h1>

      <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2">
        <div className="mx-auto flex max-w-prose flex-col items-start justify-center space-y-4 md:mx-0">
          <p className="text-2xl">Author: {book.author}</p>
          <p className="text-2xl">ISBN: {book.isbn}</p>
          <p className="text-2xl">
            Published: {book.published.toLocaleDateString()}
          </p>
          <p>Uploaded: {book.createdAt.toLocaleDateString()}</p>
          <p>Updated: {book.updatedAt.toLocaleDateString()}</p>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="rounded-lg">
            <img
              src="https://placehold.net/400x600.png"
              alt="Placeholder image"
              className="w-full max-w-[200px] rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button asChild className="">
          <Link href={`/books/${book.id}/edit`}>
            Edit Book
            <BookDashed />
          </Link>
        </Button>
        <DeleteBookButton
          action={async () => {
            "use server"

            await prisma.book.delete({ where: { id: book.id } })
          }}
        />
      </div>
    </div>
  )
}

export default BookDetailsPage
