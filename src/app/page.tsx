'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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
	const [subtitleUrl, setSubtitleUrl] = useState<string | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const spokenComments = useRef<Set<number>>(new Set());

	const fetchComments = async () => {
		setLoading(true);
		setError('');
		setComments([]);
		setPostTitle('');
		spokenComments.current.clear(); // Reset spoken comments

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
				generateWebVTT(response.data.top_comments);
			}
		} catch (err) {
			setError('❌ Failed to fetch comments. Check API.');
		}
		setLoading(false);
	};

	// Generate WebVTT subtitles
	const generateWebVTT = (comments: Comment[]) => {
		if (comments.length === 0) return;

		let vttContent = 'WEBVTT\n\n';
		comments.forEach((comment, index) => {
			const startTime = index * 5; // Each comment lasts 5 seconds
			const endTime = startTime + 5;
			vttContent += `${formatTime(startTime)} --> ${formatTime(endTime)}\n`;
			vttContent += `${comment.comment}\n\n`;
		});

		// Create a Blob URL
		const blob = new Blob([vttContent], { type: 'text/vtt' });
		setSubtitleUrl(URL.createObjectURL(blob));
	};

	// Format time for VTT
	const formatTime = (seconds: number) => {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = seconds % 60;
		return `${String(h).padStart(2, '0')}:${String(m).padStart(
			2,
			'0',
		)}:${String(s).padStart(2, '0')}.000`;
	};

	// Function to play voice-over in sync with video
	const handleVideoTimeUpdate = () => {
		if (!videoRef.current) return;
		const currentTime = Math.floor(videoRef.current.currentTime);

		comments.forEach((comment, index) => {
			const commentStartTime = index * 5; // Sync time for each comment
			if (
				currentTime === commentStartTime &&
				!spokenComments.current.has(index)
			) {
				spokenComments.current.add(index); // Mark as spoken
				playTextToSpeech(comment.comment);
			}
		});
	};

	// Function to play text-to-speech
	const playTextToSpeech = (text: string) => {
		if (!window.speechSynthesis) {
			setError('❌ Your browser does not support text-to-speech.');
			return;
		}

		const utterance = new SpeechSynthesisUtterance(text);
		utterance.rate = 1.0;
		utterance.pitch = 1.0;
		utterance.volume = 1.0;
		utterance.lang = 'en-US';
		window.speechSynthesis.speak(utterance);
	};

	useEffect(() => {
		return () => {
			if (subtitleUrl) URL.revokeObjectURL(subtitleUrl);
		};
	}, [subtitleUrl]);

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
				className="w-full px-4 py-3 border-none bg-white text-black rounded-lg"
			/>

			<button
				onClick={fetchComments}
				disabled={loading}
				className="mt-4 bg-pink-500 px-4 py-2 rounded">
				{loading ? 'Fetching...' : '🔍 Get Comments'}
			</button>

			{error && <p className="text-red-700 mt-4">{error}</p>}
			{postTitle && <h2 className="mt-6 text-xl font-bold">📰 {postTitle}</h2>}

			<video
				ref={videoRef}
				onTimeUpdate={handleVideoTimeUpdate}
				controls
				className="mt-4 w-full max-w-xl">
				<source src="/videoplayback.mp4" type="video/mp4" />
				{subtitleUrl && (
					<track
						src={subtitleUrl}
						kind="subtitles"
						srcLang="en"
						label="English"
						default
					/>
				)}
			</video>
		</div>
	);
}
