import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home';
// import UsersList from './components/UsersList';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route
					path='/profile/:userId'
					element={<Profile />}
				/>
				<Route
					path='/'
					element={<Home />}
				/>
				{/* <Route
					path='/users'
					element={<UsersList />}
				/> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
