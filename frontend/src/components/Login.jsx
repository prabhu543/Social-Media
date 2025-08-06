import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ onLogin }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const BASE_URL = 'http://localhost:5000/api';

	// Check if userId is in localStorage to decide if logged in
	useEffect(() => {
		const userId = localStorage.getItem('userId');
		if (userId) {
			// User already logged in, redirect to Home or feed
			navigate('/');
		}
	}, [navigate]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(`${BASE_URL}/auth/login`, formData);
			const { userId } = res.data;

			// Save only userId in localStorage (no token)
			localStorage.setItem('userId', userId);

			if (onLogin) onLogin();

			// Navigate to Home after login
			navigate('/');
		} catch (err) {
			const msg = err.response?.data?.message || err.message || 'Login failed';
			setError(msg);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto p-6'>
			<h2 className='text-2xl font-bold mb-4'>Login</h2>

			{error && <p className='text-red-600 mb-3'>{error}</p>}

			<input
				type='email'
				name='email'
				placeholder='Email'
				value={formData.email}
				onChange={handleChange}
				required
				className='border p-2 mb-3 w-full'
			/>
			<input
				type='password'
				name='password'
				placeholder='Password'
				value={formData.password}
				onChange={handleChange}
				required
				className='border p-2 mb-3 w-full'
			/>
			<button
				type='submit'
				className='bg-blue-600 text-white p-2 rounded w-full'>
				Login
			</button>

			<p className='mt-4 text-center'>
				Don't have an account?{' '}
				<Link
					to='/register'
					className='text-blue-600 hover:underline'>
					Register here
				</Link>
			</p>
		</form>
	);
}
