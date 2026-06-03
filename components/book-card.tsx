import type { Book } from "@/lib/generated/prisma/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

type Props = {
  book: Book
}

function BookCard({ book }: Props) {
  return (
    <Card className="shadow-md hover:scale-105 hover:shadow-2xl">
      <CardHeader>
        <CardTitle>
          <h2 className="font-bold">{book.title}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Author: {book.author}</p>
        <p>Published: {book.published.toLocaleDateString()}</p>
        <p>ISBN: {book.isbn}</p>
      </CardContent>
      <CardDescription>
        Created at: {book.createdAt.toLocaleDateString()}
      </CardDescription>
      <CardFooter></CardFooter>
    </Card>
  )
}

export { BookCard }
