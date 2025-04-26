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

export const generateVideoSchema = z.object({
  video_url: requiredString,
  voice_id: requiredString,
  text: requiredString,
})

export type GenerateVideoValues = z.infer<typeof generateVideoSchema>

export const generateFreeVideoSchema = z.object({
  text: requiredString,
})

export type GenerateFreeVideoValues = z.infer<typeof generateFreeVideoSchema>
