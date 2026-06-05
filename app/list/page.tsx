import prisma from "@/lib/prisma"
import { BookTable } from "./_components/book-table"

export default async function ListViewPage() {
  const books = await prisma.book.findMany({
    orderBy: { published: "desc" },
  })
  return (
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="text-3xl font-semibold">Table of books</h1>

      {/* {Create book table here} */}
      <div>
        <BookTable books={books} />
      </div>
    </div>
  )
}
