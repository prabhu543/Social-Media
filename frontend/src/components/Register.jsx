import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		bio: '',
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const BASE_URL = 'http://localhost:5000/api';

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${BASE_URL}/auth/register`, formData);
			alert(res.data.message || 'Registration successful! Please login.');
			navigate('/login');
		} catch (err) {
			const msg =
				err.response?.data?.message || err.message || 'Registration failed';
			setError(msg);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto p-6'>
			<h2 className='text-2xl font-bold mb-4'>Register</h2>

			{error && <p className='text-red-600 mb-3'>{error}</p>}

			<input
				type='text'
				name='name'
				placeholder='Name'
				value={formData.name}
				onChange={handleChange}
				required
				className='border p-2 mb-3 w-full'
			/>
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
			<textarea
				name='bio'
				placeholder='Short bio'
				value={formData.bio}
				onChange={handleChange}
				className='border p-2 mb-3 w-full'
				rows='3'
			/>
			<button
				type='submit'
				className='bg-blue-600 text-white p-2 rounded w-full'>
				Register
			</button>

			<p className='mt-4 text-center'>
				Already have an account?{' '}
				<Link
					to='/login'
					className='text-blue-600 hover:underline'>
					Login here
				</Link>
			</p>
		</form>
	);
}
