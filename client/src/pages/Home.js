import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Home() {
	const [recipes, setRecipes] = useState([]);
	const [cookies] = useCookies('access_token');
	const [savedRecipes, setSavedRecipes] = useState([]);
	const userId = localStorage.getItem('userId');

	const saveRecipe = async (recipeId) => {
		try {
			await axios.put(
				'http://localhost:4000/recipes',
				{
					userId,
					recipeId,
				},
				{
					headers: {
						authorization: cookies.access_token,
					},
				}
			);
			fetchSavedRecipes(userId);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchRecipes = async () => {
		try {
			const { data } = await axios.get('http://localhost:4000/recipes');
			setRecipes(data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchSavedRecipes = async (id) => {
		try {
			const { data } = await axios.get(
				`http://localhost:4000/recipes/savedRecipes/ids/${userId}`,
				{
					headers: {
						authorization: cookies.access_token,
					},
				}
			);
			setSavedRecipes(data.savedRecipes);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRecipes();
		if (cookies.access_token) {
			fetchSavedRecipes(userId);
		}
	}, []);

	return (
		<div className="recipe-container">
			<h2>Recipes</h2>
			<ul>
				{recipes.map((recipe) => (
					<li key={recipe._id}>
						<p>{savedRecipes.includes(recipe._id)}</p>
						<div>
							<h2>{recipe.name}</h2>
							{savedRecipes.includes(recipe._id) && cookies.access_token ? (
								<div>Already Saved</div>
							) : (
								cookies.access_token && (
									<button onClick={saveRecipe.bind(this, recipe._id)}>
										Save
									</button>
								)
							)}
						</div>
						<h4>Ingredients:</h4>

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
