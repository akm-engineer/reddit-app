import { kyInstance } from "@/lib/ky"
import { postByIdSchema, type PostByIdValues } from "../validations"

type Comment = {
  username: string
  score: number
  comment: string
}

export const getRedditPostById = async ({
  input,
}: {
  input: PostByIdValues
}): Promise<
  { error?: string } | { data?: { title: string; top_comments: Comment[] } }
> => {
  try {
    const { postId } = postByIdSchema.parse(input)

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
