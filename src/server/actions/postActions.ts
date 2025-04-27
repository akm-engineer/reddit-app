import { kyInstance } from "@/lib/ky"
import {
  generateFreeVideoSchema,
  generateVideoSchema,
  redditCommentsSchema,
  redditPostUrlRegex,
  type GenerateFreeVideoValues,
  type GenerateVideoValues,
  type RedditCommentsValues,
} from "../validations"
import { BASEURL } from ".."

type Comment = {
  username: string
  score: number
  comment: string
}

export const fetchRedditComments = async ({
  input,
}: {
  input: RedditCommentsValues
}): Promise<
  { error?: string } | { data?: { title: string; top_comments: Comment[] } }
> => {
  try {
    const { url } = redditCommentsSchema.parse(input)

    const match = redditPostUrlRegex.exec(url)
    const postId = match?.[1] ?? ""

    if (!postId) {
      throw new Error("Invalid Reddit post ID extracted.")
    }

    const res = await kyInstance
      .get(`http://localhost:8080/reddit/comments?post_id=${postId}`)
      .json<{ title: string; top_comments: Comment[] }>()

    console.log(res)

    return { data: res }
  } catch (error) {
    console.error(error)
    return {
      error: "Something went wrong, please try again.",
    }
  }
}

export const generateVideo = async ({
  input,
}: {
  input: GenerateVideoValues
}) => {
  try {
    const { text, video_url, voice_id } = generateVideoSchema.parse(input)

    const res = await kyInstance
      .post(`${BASEURL}/generate-av`, { json: { text, video_url, voice_id } })
      .json()

    console.log(res)

    return { data: res }
  } catch (error) {
    console.error(error)
    return {
      error: "Something went wrong, please try again.",
    }
  }
}

export const generateFreeVideo = async ({
  input,
}: {
  input: GenerateFreeVideoValues
}) => {
  try {
    const { text } = generateFreeVideoSchema.parse(input)

    const res = await kyInstance
      .post(`${BASEURL}/generate-av`, { json: { text } })
      .json()

    console.log(res)

    return { data: res }
  } catch (error) {
    console.error(error)
    return {
      error: "Something went wrong, please try again.",
    }
  }
}

export const getAllVideos = async ({}) => {
  try {
    // const { text, video_url, voice_id } = generateVideoSchema.parse(input)

    const res = await kyInstance.get(`${BASEURL}/all-generated-videos`).json()

    console.log(res)

    return { data: res }
  } catch (error) {
    console.error(error)
    return {
      error: "Something went wrong, please try again.",
    }
  }
}

export const getAllVoices = async ({}) => {
  try {
    // const { text, video_url, voice_id } = generateVideoSchema.parse(input)

    const res = await kyInstance.get(`${BASEURL}/api/get-voices`).json()

    console.log(res)

    return { data: res }
  } catch (error) {
    console.error(error)
    return {
      error: "Something went wrong, please try again.",
    }
  }
}
