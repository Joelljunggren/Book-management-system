import { CreateBookForm } from "./_components/create-book-form"

export default function AddBookPage() {
  return (
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="text-3xl font-semibold">Add book</h1>

      {/* {Create book form here} */}
      <CreateBookForm />
    </div>
  )
}
