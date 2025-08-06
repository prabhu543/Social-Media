import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
	const [userId, setUserId] = useState(null);

	// read the userId from localStorage and set state 
	useEffect(() => {
		const storedUserId = localStorage.getItem('userId');
		setUserId(storedUserId);
	}, []);

	const profilePath = userId ? `/profile/${userId}` : '/login';

	return (
		<nav className='w-full bg-white border-b border-gray-200 px-7 py-3 flex items-center justify-between'>
			<Link
				to='/'
				className='text-xl'>
				Social Media
			</Link>

			<div>
				{!userId ? (
					<Link
						to='/login'
						className='text-gray-600 hover:text-blue-600 font-medium'>
						Login
					</Link>
				) : (
					<Link
						to={profilePath}
						className='text-gray-600 hover:text-blue-600 font-medium'>
						Profile
					</Link>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
