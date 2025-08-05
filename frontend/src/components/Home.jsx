import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000/api';

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Fetch all posts from backend
	const fetchPosts = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${BASE_URL}/posts`);
			setPosts(res.data);
		} catch (err) {
			console.error('Error fetching posts:', err);
			setPosts([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	// Create new post API call with authorization
	const createPost = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		if (!token || !userId) {
			navigate('/login'); // redirect if not authenticated
			return;
		}
		try {
			await axios.post(
				`${BASE_URL}/posts`,
				{ text, authorEmail: userId },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setText('');
			fetchPosts(); // Refresh posts after creating
		} catch (err) {
			alert(
				'Could not create post: ' + (err.response?.data?.message || err.message)
			);
		}
	};

	return (
		<div className='max-w-3xl mx-auto p-6'>
			<h1 className='text-2xl font-bold mb-4'>Feed</h1>

			<form
				onSubmit={createPost}
				className='mb-6'>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="What's on your mind?"
					required
					className='w-full border p-3 rounded mb-2'
					rows='3'
				/>
				<button
					type='submit'
					className='bg-blue-600 text-white px-4 py-2 rounded'>
					Post
				</button>
			</form>

			{loading ? (
				<p>Loading posts...</p>
			) : posts.length === 0 ? (
				<p>No posts yet.</p>
			) : (
				<div className='space-y-6'>
					{posts.map((post) => (
						<article
							key={post._id}
							className='border p-4 rounded shadow-sm'>
							<p className='text-gray-800'>{post.text}</p>
							<p className='text-sm text-gray-500 mt-2'>
								Posted by <strong>{post.author?.name || 'Unknown'}</strong> on{' '}
								{new Date(post.createdAt).toLocaleString()}
							</p>
						</article>
					))}
				</div>
			)}
		</div>
	);
}
