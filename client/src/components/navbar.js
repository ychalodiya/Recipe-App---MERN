import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Navbar() {
	const navigate = useNavigate();
	const [cookies, setCookies] = useCookies(['access_token']);
	const clickHandler = () => {
		setCookies('access_token', '');
		localStorage.removeItem('userId');
		navigate('/login');
	};

	return (
		<div className="navbar">
			<Link to="/">Home</Link>
			{cookies.access_token ? (
				<>
					<Link to="/create-recipe">Create Recipe</Link>
					<Link to="/saved-recipes">Saved Recipes</Link>
					<a onClick={clickHandler}>Logout</a>
				</>
			) : (
				<Link to="/login">Login/Register</Link>
			)}
		</div>
	);
}
