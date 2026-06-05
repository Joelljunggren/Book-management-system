// app/list/_components/book-table.tsx
import { Button } from "@/components/ui/button"
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import type { Book } from "@/lib/generated/prisma/client"
import { BookSearch } from "lucide-react"
import Link from "next/link"

type Props = {
  books: Book[]
}

function BookTable({ books }: Props) {
  return (
    <div className="border p-4">
      <Table>
        <TableCaption>List of books</TableCaption>

        <TableHeader className="font-bold">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Added</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>
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
    </div>
  )
}

export { BookTable }
