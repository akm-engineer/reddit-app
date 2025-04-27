import { z } from "zod"

const requiredString = z.string().trim().min(1, "Required")

export const loginSchema = z.object({
  email: requiredString.email("Enter a valid email"),
  password: requiredString,
})

export type LoginValues = z.infer<typeof loginSchema>

export const redditPostUrlRegex = /comments\/([a-z0-9]+)/i

// export const redditCommentsSchema = z
//   .object({
//     url: requiredString.refine(
//       (url) => {
//         const match = redditPostUrlRegex.exec(url)
//         return !!match
//       },
//       {
//         message: "Invalid Reddit URL!",
//       }
//     ),
//   })
//   .transform((data) => {
//     const match = redditPostUrlRegex.exec(data.url)
//     return {
//       postId: match?.[1] ?? "",
//     }
//   })
export const redditCommentsSchema = z.object({
  url: requiredString.refine((url) => redditPostUrlRegex.test(url), {
    message: "Invalid Reddit URL!",
  }),
})

export type RedditCommentsValues = z.infer<typeof redditCommentsSchema>

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
