'use client';

import React, { useState } from 'react';
import {
	extractPostId,
	fetchRedditComments,
	getSummary,
} from './actions/redditActions';

interface Comment {
	username: string;
	score: number;
	comment: string;
}

export default function Home() {
	const [url, setUrl] = useState('');
	const [postTitle, setPostTitle] = useState('');
	const [comments, setComments] = useState<Comment[]>([]);
	const [summary, setSummary] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchComments = async () => {
		setLoading(true);
		setError('');
		setComments([]);
		setPostTitle('');
		setSummary('');

		const postId = extractPostId(url);
		if (!postId) {
			setError('❌ Invalid Reddit URL!');
			setLoading(false);
			return;
		}

		try {
			const data = await fetchRedditComments(postId);
			setPostTitle(data.title);
			const topComments = data.top_comments.slice(0, 5);
			setComments(topComments);

			const prompt = `Please provide a concise summary for the following question: 
${data.title}
and also include key insights from the comments below:\n\n${topComments
				.map((c: Comment) => c.comment)
				.join('\n')}\n\nSummary:`;

			const summaryText = await getSummary(prompt);
			setSummary(summaryText);
		} catch (err: any) {
			setError('❌ Failed to fetch comments. Check API.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700 text-black p-6">
			<h1 className="text-4xl font-extrabold text-center mb-6">
				🚀 Reddit Comment Fetcher
			</h1>
			<input
				type="text"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder="🔗 Paste Reddit Post URL"
				className="w-full max-w-xl px-4 py-3 bg-white text-black rounded-lg shadow-md focus:outline-none"
			/>
			<button
				onClick={fetchComments}
				disabled={loading}
				className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition">
				{loading ? 'Fetching...' : '🔍 Get Comments'}
			</button>
			{error && <p className="text-red-700 mt-4">{error}</p>}
			{postTitle && (
				<h2 className="mt-6 text-xl font-bold text-center">📰 {postTitle}</h2>
			)}

			{/* Comments Section */}
			<div className="mt-6 w-full max-w-xl grid gap-4">
				{comments.map((comment, index) => (
					<div
						key={index}
						className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
						<div className="flex justify-between items-center mb-2">
							<h3 className="font-bold text-lg">{comment.username}</h3>
							<span className="text-sm text-gray-600">
								Score: {comment.score}
							</span>
						</div>
						<p className="text-gray-800 text-sm">{comment.comment}</p>
					</div>
				))}
			</div>

			{/* AI Summary Section */}
			{summary && (
				<div className="mt-8 w-full max-w-xl p-4 bg-white rounded-lg shadow-md">
					<h3 className="font-bold text-xl mb-2">Summary</h3>
					<p className="text-gray-800 text-base">{summary}</p>
				</div>
			)}
		</div>
	);
}
