import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Login() {
	const navigate = useNavigate();
	const [, setCookies] = useCookies('access_token');
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
				'http://localhost:4000/auth/login',
				userData
			);
			setCookies('access_token', data.token);
			localStorage.setItem('userId', data.id);
			navigate('/');
		} catch (err) {
			alert(err?.response?.data?.message || err.message);
		}
	};

	return (
		<div className="auth-container">
			<form onSubmit={submitHandler}>
				<h2>Login</h2>
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
				<button type="submit">Submit</button>{' '}
				<p>
					Don't have an account? <Link to="/register">Create new one</Link>
				</p>
			</form>
		</div>
	);
}
