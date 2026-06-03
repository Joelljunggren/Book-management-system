import type { Book } from "@/lib/generated/prisma/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"

type Props = {
  book: Book
}

function BookCard({ book }: Props) {
  return (
    <Card className="overflow-hidden pt-0 shadow-md hover:scale-105 hover:shadow-2xl">
      <CardHeader className="p-0">
        <div className="bg-primary px-6 py-4 text-primary-foreground">
          <CardTitle className="m-0 p-0">
            <h2 className="font-bold">{book.title}</h2>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="font-semibold">
        <p>Author: {book.author}</p>
        <p>Published: {book.published.toLocaleDateString()}</p>
        <p>ISBN: {book.isbn}</p>
      </CardContent>
      <CardDescription>
        Created at: {book.createdAt.toLocaleDateString()}
      </CardDescription>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="#">View Book</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { BookCard }
