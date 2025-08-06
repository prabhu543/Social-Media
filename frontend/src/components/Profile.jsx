import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
	const { userId } = useParams();
	const navigate = useNavigate();
	const BASE_URL = 'http://localhost:5000/api';

	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Get current logged-in userId from localStorage
	const currentUserId = localStorage.getItem('userId');

	useEffect(() => {
		if (!userId) {
			navigate('/login');
			return;
		}

		const fetchProfileAndPosts = async () => {
			setLoading(true);
			try {
				const userRes = await axios.get(`${BASE_URL}/users/${userId}`);
				const postsRes = await axios.get(`${BASE_URL}/posts/user/${userId}`);

				setUser(userRes.data);
				setPosts(postsRes.data);
				setError('');
			} catch (err) {
				setError('Failed to load profile data. Please try again.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfileAndPosts();
	}, [userId, navigate]);

	const handleLogout = () => {
		localStorage.removeItem('userId');
		navigate('/login');
	};

	if (loading) return <p className='text-center mt-10'>Loading profile...</p>;
	if (error) return <p className='text-center mt-10 text-red-600'>{error}</p>;
	if (!user)
		return (
			<p className='text-center mt-10 text-red-600'>User data not found.</p>
		);

	return (
		<div className='max-w-3xl mx-auto p-6'>
			<Link
				to='/'
				className='text-blue-600 hover:underline mb-4 inline-block'>
				&larr; Back to Home
			</Link>

			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-3xl font-bold'>{user.name}</h1>
				{/* Conditionally show Logout button only on own profile */}
				{currentUserId === userId && (
					<button
						onClick={handleLogout}
						className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition'>
						Logout
					</button>
				)}
			</div>

			<p className='text-gray-600 mb-1'>Email: {user.email}</p>
			<p className='mb-6'>{user.bio || 'No bio available.'}</p>

			<h2 className='text-xl font-semibold mb-3'>Posts</h2>
			<div className='space-y-4'>
				{posts.length === 0 ? (
					<p>No posts yet.</p>
				) : (
					posts.map((post) => (
						<article
							key={post._id}
							className='border p-4 rounded shadow-sm'>
							<p>{post.text}</p>
							<p className='text-sm text-gray-500 mt-2'>
								Posted on {new Date(post.createdAt).toLocaleString()}
							</p>
						</article>
					))
				)}
			</div>
		</div>
	);
}
