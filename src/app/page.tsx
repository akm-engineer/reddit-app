'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';

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
	const [audioUrl, setAudioUrl] = useState<string | null>(null);
	const [vttUrl, setVttUrl] = useState<string | null>(null);

	// References for video and audio elements for synchronization
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Fetch Reddit comments and summarize them
	const fetchComments = async () => {
		setLoading(true);
		setError('');
		setComments([]);
		setPostTitle('');
		setSummary('');
		setAudioUrl(null);
		setVttUrl(null);

		try {
			// Extract the post ID from the Reddit URL
			const postIdMatch = url.match(/comments\/([a-z0-9]+)/);
			if (!postIdMatch) {
				setError('❌ Invalid Reddit URL!');
				setLoading(false);
				return;
			}
			const postId = postIdMatch[1];

			// Replace with your API endpoint for Reddit comments
			const response = await axios.get(
				`http://localhost:8080/reddit/comments?post_id=${postId}`,
			);

			if (response.data) {
				setPostTitle(response.data.title);
				// Get top 5 comments
				const topComments = response.data.top_comments.slice(0, 5);
				setComments(topComments);

				// Prepare the prompt for summarization
				const prompt = `Please provide a concise summary for the following question: 
"Relocating to India from the US after 13 years" 
and also include key insights from the comments below:\n\n${topComments
					.map((c: Comment) => c.comment)
					.join('\n')}\n\nSummary:`;

				// Call your summarization API route (assumed to be at /api/summarize)
				const summaryResponse = await axios.post('/api/summarise', { prompt });
				setSummary(summaryResponse.data.summary);

				// Now, call your TTS API to convert the summary to audio
				const ttsResponse = await axios.post('/api/tts', {
					text: summaryResponse.data.summary,
				});
				setAudioUrl(ttsResponse.data.audioUrl);

				// Generate a simple WebVTT file for captions from the summary text
				const vttContent = `WEBVTT

00:00:00.000 --> 00:00:10.000
${summaryResponse.data.summary}
`;
				const blob = new Blob([vttContent], { type: 'text/vtt' });
				const vttBlobUrl = URL.createObjectURL(blob);
				setVttUrl(vttBlobUrl);
			}
		} catch (err: any) {
			setError('❌ Failed to fetch comments. Check API.');
		}
		setLoading(false);
	};

	// Synchronize video and audio playback
	useEffect(() => {
		if (videoRef.current && audioRef.current) {
			const syncAudio = () => {
				if (videoRef.current!.paused) {
					audioRef.current!.pause();
				} else {
					audioRef.current!.play();
				}
			};

			videoRef.current.addEventListener('play', syncAudio);
			videoRef.current.addEventListener('pause', syncAudio);

			return () => {
				videoRef.current?.removeEventListener('play', syncAudio);
				videoRef.current?.removeEventListener('pause', syncAudio);
			};
		}
	}, [videoRef, audioRef]);

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

			{/* Video with Captions and Audio */}
			{audioUrl && (
				<div className="mt-8 w-full max-w-4xl">
					<video
						ref={videoRef}
						controls
						className="w-full"
						// Provide your video URL here:
						src="/videoplayback.mp4">
						{vttUrl && (
							<track
								default
								kind="subtitles"
								srcLang="en"
								label="English"
								src={vttUrl}
							/>
						)}
					</video>
					{/* Hidden audio element (if needed for separate playback) */}
					<audio
						ref={audioRef}
						src={audioUrl}
						preload="auto"
						style={{ display: 'none' }}
					/>
				</div>
			)}
		</div>
	);
}
