import prisma from "@/lib/prisma"
import { BookEditForm } from "./_components/book-edit-form"
import { notFound } from "next/navigation"

async function EditBookPage(props: PageProps<"/books/[bookId]/edit">) {
  const params = await props.params

  const book = await prisma.book.findUnique({
    where: { id: params.bookId },
  })

  if (!book) notFound()

  return (
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="text-3xl font-semibold">Edit book</h1>

      {/* {Edit book form here} */}
      <BookEditForm book={book}></BookEditForm>
    </div>
  )
}

export default EditBookPage
