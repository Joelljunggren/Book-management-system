import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Book } from "@/lib/generated/prisma/client"
import prisma from "@/lib/prisma"
import { BookPlus } from "lucide-react"
import Link from "next/link"

// const mockBooks: Book[] = [
//   {
//     id: "1",
//     title: "The Pragmatic Programmer",
//     author: "Andrew Hunt",
//     isbn: "978-0201616224",
//     published: new Date("1999-10-20"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "2",
//     title: "Clean Code",
//     author: "Robert C. Martin",
//     isbn: "978-0132350884",
//     published: new Date("2008-08-11"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "3",
//     title: "Dirty Code",
//     author: "Robert C. Martin",
//     isbn: "978-0132350884",
//     published: new Date("2008-08-11"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "4",
//     title: "Horrific Code",
//     author: "Robert C. Martin",
//     isbn: "978-0132350884",
//     published: new Date("2008-08-11"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ]

export default async function Page() {
  const books = await prisma.book.findMany({
    orderBy: { published: "desc" },
  })
  // const books = mockBooks

  return (
    <div className="relative flex p-6">
      <div className="w-full max-w-7xl">
        <h1 className="mb-6 text-3xl font-semibold">Book listings</h1>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
          <Button asChild className="col-span-full mt-6">
            <Link href="/add-book">
              Add another book to library
              <BookPlus />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
