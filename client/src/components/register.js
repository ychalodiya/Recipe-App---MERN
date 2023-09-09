import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!username || !password) {
			alert("Username and password fields shouldn't be empty");
		}
		try {
			const userData = { username, password };
			const { data } = await axios.post(
				'http://localhost:4000/auth/register',
				userData
			);
			navigate('/login');
		} catch (err) {
			alert(err?.response?.data?.message || err.message);
		}
	};

	return (
		<div className="auth-container">
			<form onSubmit={submitHandler}>
				<h2>Account registration</h2>
				<div className="form-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Create Acoount</button>
				<p>
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</form>
		</div>
	);
}
