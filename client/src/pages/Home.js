import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
	const [recipes, setRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const userId = localStorage.getItem('userId');

	const saveRecipe = async (recipeId) => {
		try {
			await axios.put('http://localhost:4000/recipes', {
				userId,
				recipeId,
			});
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
				`http://localhost:4000/recipes/savedRecipes/ids/${userId}`
			);
			setSavedRecipes(data.savedRecipes);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchSavedRecipes(userId);
		fetchRecipes();
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
							{savedRecipes.includes(recipe._id) ? (
								<div>Already Saved</div>
							) : (
								<button onClick={saveRecipe.bind(this, recipe._id)}>
									Save
								</button>
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
