'use client';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Comment {
	username: string;
	score: number;
	comment: string;
}

export default function Home() {
	const [url, setUrl] = useState('');
	const [postTitle, setPostTitle] = useState('');
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchComments = async () => {
		setLoading(true);
		setError('');
		setComments([]);
		setPostTitle('');

		try {
			const postIdMatch = url.match(/comments\/([a-z0-9]+)/);
			if (!postIdMatch) {
				setError('❌ Invalid Reddit URL!');
				setLoading(false);
				return;
			}

			const postId = postIdMatch[1];

			const response = await axios.get(
				`http://localhost:8080/reddit/comments?post_id=${postId}`,
			);

			if (response.data) {
				setPostTitle(response.data.title);
				setComments(response.data.top_comments);
			}
		} catch (err) {
			setError('❌ Failed to fetch comments. Check API.');
		}
		setLoading(false);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700 text-black p-6">
			<motion.div
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className="bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 max-w-3xl w-full border border-white/20">
				<motion.h1
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="text-4xl font-extrabold text-center mb-6 drop-shadow-lg">
					🚀 Reddit Comment Fetcher
				</motion.h1>

				<div className="flex flex-col gap-4">
					<motion.input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						placeholder="🔗 Paste Reddit Post URL"
						className="w-full px-4 py-3 border-none bg-white bg-opacity-20  text-black rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400 placeholder-white"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					/>
					<motion.button
						onClick={fetchComments}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-black font-semibold py-3 rounded-lg transition-all duration-300"
						disabled={loading}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}>
						{loading ? 'Fetching...' : '🔍 Get Comments'}
					</motion.button>
				</div>

				{error && (
					<motion.p
						className="text-red-700 mt-4 text-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}>
						{error}
					</motion.p>
				)}

				{postTitle && (
					<motion.h2
						className="mt-6 text-xl font-bold text-center bg-white bg-opacity-20 p-3 rounded-lg shadow-md"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						📰 {postTitle}
					</motion.h2>
				)}

				<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
					{comments.length > 0
						? comments.map((comment, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl p-4 border border-white/30">
									<p className="text-lg font-semibold text-black">
										@{comment.username}
									</p>
									<p className="text-gray-700 text-sm mt-1">
										{comment.comment}
									</p>
									<p className="text-xs text-red-600 mt-2">
										❤️ Likes: {comment.score}
									</p>
								</motion.div>
						  ))
						: postTitle && (
								<motion.p
									className="text-gray-700 text-center"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}>
									😞 No comments found.
								</motion.p>
						  )}
				</div>
			</motion.div>
		</div>
	);
}
