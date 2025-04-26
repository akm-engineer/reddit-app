import { z } from "zod"

const requiredString = z.string().trim().min(1, "Required")

export const loginSchema = z.object({
  email: requiredString.email("Enter a valid email"),
  password: requiredString,
})

export type LoginValues = z.infer<typeof loginSchema>

const redditPostIdRegex = /comments\/([a-z0-9]+)/i

export const postByIdSchema = z
  .object({
    url: requiredString.refine(
      (url) => {
        const match = redditPostIdRegex.exec(url)
        return !!match
      },
      {
        message: "Invalid Reddit URL!",
      }
    ),
  })
  .transform((data) => {
    const match = redditPostIdRegex.exec(data.url)
    return {
      postId: match?.[1] ?? "",
    }
  })

export type PostByIdValues = z.infer<typeof postByIdSchema>
