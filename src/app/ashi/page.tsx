"use client"
import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

interface Comment {
  username: string
  score: number
  comment: string
}

export default function Page() {
  const [url, setUrl] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchComments = async () => {
    setLoading(true)
    setError("")
    setComments([])
    setPostTitle("")

    try {
      const postIdMatch = url.match(/comments\/([a-z0-9]+)/)
      if (!postIdMatch) {
        setError("❌ Invalid Reddit URL!")
        setLoading(false)
        return
      }

      const postId = postIdMatch[1]

      const response = await axios.get(
        `http://localhost:8080/reddit/comments?post_id=${postId}`
      )

      if (response?.data) {
        setPostTitle(response?.data?.title)
        setComments(response?.data?.top_comments)
      }
    } catch (err) {
      console.error(err)
      setError("❌ Failed to fetch comments. Check API.")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-700 p-6 text-black">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-opacity-10 w-full max-w-3xl rounded-3xl border border-white/20 bg-white p-8 shadow-2xl backdrop-blur-lg"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center text-4xl font-extrabold drop-shadow-lg"
        >
          🚀 Reddit Comment Fetcher
        </motion.h1>

        <div className="flex flex-col gap-4">
          <motion.input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="🔗 Paste Reddit Post URL"
            className="bg-opacity-20 w-full rounded-lg border-none bg-white px-4 py-3 text-black placeholder-white focus:ring-4 focus:ring-pink-400 focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.button
            onClick={fetchComments}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 py-3 font-semibold text-black transition-all duration-300"
            disabled={loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {loading ? "Fetching..." : "🔍 Get Comments"}
          </motion.button>
        </div>

        {error && (
          <motion.p
            className="mt-4 text-center text-red-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {postTitle && (
          <motion.h2
            className="bg-opacity-20 mt-6 rounded-lg bg-white p-3 text-center text-xl font-bold shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            📰 {postTitle}
          </motion.h2>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {comments.length > 0
            ? comments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-opacity-20 rounded-xl border border-white/30 bg-white p-4 shadow-lg backdrop-blur-lg"
                >
                  <p className="text-lg font-semibold text-black">
                    @{comment.username}
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    {comment.comment}
                  </p>
                  <p className="mt-2 text-xs text-red-600">
                    ❤️ Likes: {comment.score}
                  </p>
                </motion.div>
              ))
            : postTitle && (
                <motion.p
                  className="text-center text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  😞 No comments found.
                </motion.p>
              )}
        </div>
      </motion.div>
    </div>
  )
}
