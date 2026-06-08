"use client"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { editBook } from "../_actions/book-actions"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eraser, Save } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"

type Props = {
  book: {
    id: string
    title: string
    author: string
    isbn: string
    published: Date
  }
}

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),

  isbn: z
    .string()
    .min(1, "ISBN is required")
    .transform((v) => v.replace(/[-\s]/g, ""))
    .refine((v) => /^\d{13}$/.test(v), {
      message: "ISBN must be a valid ISBN-13",
    }),

  published: z.iso.date("Publishing date is required"),
})
function toDateInputValue(date: Date) {
  return date.toISOString().split("T")[0]
}

function BookEditForm({ book }: Props) {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      published: toDateInputValue(book.published),
    },
    validators: {
      onChange: bookSchema,
      onSubmit: bookSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const updatedBook = await editBook({
        id: book.id,
        author: value.author,
        title: value.title,
        isbn: value.isbn,
        published: new Date(value.published), //Same issue here
      })
      formApi.reset({
        title: updatedBook.title,
        author: updatedBook.author,
        isbn: updatedBook.isbn,
        published: toDateInputValue(book.published),
      })
      toast.success("Successfully edited book!")
      router.push(`/books/${updatedBook.id}`)
    },
  })

  return (
    <form
      method="POST"
      onSubmit={(ev) => {
        ev.preventDefault()
        form.handleSubmit(ev)
      }}
    >
      <FieldGroup>
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(ev) => field.handleChange(ev.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="author">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Author</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(ev) => field.handleChange(ev.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="isbn">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>ISBN</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(ev) => field.handleChange(ev.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="published">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Publishing date</FieldLabel>
                <Input
                  type="date"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(ev) => field.handleChange(ev.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
          {([isSubmitting]) => (
            <Field orientation="horizontal">
              <Button
                type="reset"
                disabled={isSubmitting}
                onClick={(ev) => {
                  ev.preventDefault()
                  form.reset()
                }}
                variant="secondary"
              >
                <Eraser />
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : <Save />}
                Save Post
              </Button>
            </Field>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  )
}

export { BookEditForm }
