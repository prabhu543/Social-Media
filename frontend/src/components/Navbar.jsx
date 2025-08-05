import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
	const userId = localStorage.getItem('userId');
	const profilePath = userId ? `/profile/${userId}` : '/login';

	return (
		<nav className='w-full bg-white border-b border-gray-200 px-7 py-3 flex items-center justify-between'>
			<Link
				to='/'
				className='text-xl font-bold'>
				LinkedInClone
			</Link>
			<ul className='hidden md:flex space-x-6'>
				<li>
					<NavLink
						to='/feed'
						className={({ isActive }) =>
							isActive
								? 'text-blue-600 font-medium'
								: 'text-gray-600 hover:text-blue-600 transition'
						}>
						Feed
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/jobs'
						className={({ isActive }) =>
							isActive
								? 'text-blue-600 font-medium'
								: 'text-gray-600 hover:text-blue-600 transition'
						}>
						Jobs
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/connections'
						className={({ isActive }) =>
							isActive
								? 'text-blue-600 font-medium'
								: 'text-gray-600 hover:text-blue-600 transition'
						}>
						Connections
					</NavLink>
				</li>
				<li>
					<NavLink
						to={profilePath}
						className={({ isActive }) =>
							isActive
								? 'text-blue-600 font-medium'
								: 'text-gray-600 hover:text-blue-600 transition'
						}>
						Profile
					</NavLink>
				</li>
			</ul>
			{/* Optional: add mobile hamburger menu using shadcn/ui here */}
		</nav>
	);
}

export default Navbar;
