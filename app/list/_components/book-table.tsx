// app/list/_components/book-table.tsx
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import type { Book } from "@/lib/generated/prisma/client"
import { BookSearch } from "lucide-react"
import Link from "next/link"

type Props = {
  books: Book[]
}

function BookTable({ books }: Props) {
  return (
    <div className="w-full overflow-hidden border p-4">
      <Table className="hidden md:block">
        {/* <TableCaption>
          Total amount of books in database: {books.length}
        </TableCaption> */}

        <TableHeader className="font-bold">
          <TableRow>
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Author</TableHead>
            <TableHead className="font-semibold">Published</TableHead>
            <TableHead className="font-semibold">Added</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="max-w-xs truncate sm:max-w-sm md:max-w-md">
                <Button className="mr-6">
                  <Link href={`books/${book.id}`}>View</Link>
                  <BookSearch />
                </Button>
                {book.title}
              </TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.published.toLocaleDateString()}</TableCell>
              <TableCell>{book.createdAt.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table className="sm:block md:hidden">
        <TableHeader className="font-bold">
          <TableRow>
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="max-w-xs truncate sm:max-w-sm md:max-w-md">
                <Button className="mr-6">
                  <Link href={`books/${book.id}`}>View</Link>
                  <BookSearch />
                </Button>
                {book.title}
              </TableCell>
              <TableCell>{book.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { BookTable }
