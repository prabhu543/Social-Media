import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://social-media-xi-roan.vercel.app/api';

// Function to shuffle users array
function shuffleArray(array) {
	let arr = array.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export default function UsersList() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const currentUserId = localStorage.getItem('userId');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`${BASE_URL}/users`);
				const filteredUsers = res.data.filter(
					(user) => user._id !== currentUserId
				);
				const randomizedUsers = shuffleArray(filteredUsers);
				setUsers(randomizedUsers);
				setError('');
			} catch (err) {
				setError('Failed to load users.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [currentUserId]);

	if (loading) return <p>Loading users...</p>;
	if (error) return <p className='text-red-600'>{error}</p>;
	if (users.length === 0) return <p>No other users found.</p>;

	return (
		<div className='max-w-3xl mx-auto p-6'>
			<h2 className='text-2xl font-bold mb-6'>Other Users</h2>
			<ul className='space-y-4'>
				{users.map((user) => (
					<li
						key={user._id}
						className='border p-4 rounded shadow-sm cursor-pointer hover:bg-gray-100 transition'
						onClick={() => navigate(`/profile/${user._id}`)}>
						<p className='font-semibold text-lg'>{user.name}</p>
						<p className='text-gray-600'>{user.email}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
