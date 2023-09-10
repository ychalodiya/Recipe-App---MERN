import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function SavedRecipe() {
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [cookies] = useCookies('access_token');
	const userId = localStorage.getItem('userId');

	const fetchSavedRecipes = async () => {
		const { data } = await axios.get(
			`http://localhost:4000/recipes/savedRecipes/${userId}`,
			{
				headers: {
					authorization: cookies.access_token,
				},
			}
		);

		setSavedRecipes(data.savedRecipes);
	};

	useEffect(() => {
		fetchSavedRecipes();
	}, []);

	return (
		<div className="recipe-container">
			<h2>Saved Recipes</h2>
			<ul>
				{savedRecipes.map((recipe) => (
					<li key={recipe._id}>
						<p>{savedRecipes.includes(recipe._id)}</p>
						<div>
							<h2>{recipe.name}</h2>
						</div>

						<div className="instructions">
							<p>{recipe.instructions}</p>
						</div>
						<img src={recipe.img} alt={recipe.name} />
						<p>Cooking Time: {recipe.cookingTime} (minutes)</p>
					</li>
				))}
			</ul>
		</div>
	);
}
