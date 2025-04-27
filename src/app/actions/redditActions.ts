// app/actions/redditActions.ts
import axios from 'axios';

export const extractPostId = (url: string): string | null => {
	const match = url.match(/comments\/([a-z0-9]+)/);
	return match ? match[1] : null;
};

export const fetchRedditComments = async (postId: string) => {
	const response = await axios.get(
		`http://localhost:8080/reddit/comments?post_id=${postId}`,
	);
	return response.data;
};

export const getSummary = async (prompt: string) => {
	const response = await axios.post('/api/summarise', { prompt });
	return response.data.summary;
};
