import prisma from "@/lib/prisma"
import { BookTable } from "./_components/book-table"

export default async function ListViewPage() {
  const books = await prisma.book.findMany({
    orderBy: { published: "desc" },
  })
  return (
    <div className="p-4 md:flex md:justify-center">
      <div className="space-y-4">
        <h1 className="text-center font-semibold md:text-2xl">
          Books registered: {books.length}
        </h1>
        <BookTable books={books} />
      </div>
    </div>
  )
}
