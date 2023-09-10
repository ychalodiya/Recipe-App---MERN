import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateRecipe() {
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState({
		name: '',
		ingredients: [],
		instructions: [],
		img: '',
		cookingTime: 0,
		owner: localStorage.getItem('userId') || 0,
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setRecipe({ ...recipe, [name]: value });
	};

	const ingredientChangeHandler = (e, index) => {
		const value = e.target.value;
		const ingredients = recipe.ingredients;
		ingredients[index] = value;
		setRecipe({ ...recipe, ingredients });
	};

	const ingredientAddHandler = () => {
		setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			console.log(recipe);
			await axios.post('http://localhost:4000/recipes', recipe);
			alert('Recipe Created');
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="create-recipe">
			<h2>Create Recipe</h2>
			<form onSubmit={submitHandler}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					onChange={changeHandler}
					required
				/>
				<label htmlFor="ingredients">Ingredients</label>
				{recipe.ingredients.map((ingredient, index) => (
					<input
						key={index}
						type="text"
						name="ingredients"
						value={ingredient}
						onChange={(e) => ingredientChangeHandler(e, index)}
						required
					/>
				))}
				<button type="button" onClick={ingredientAddHandler}>
					Add Ingredient
				</button>

				<label htmlFor="instructions">Instructions</label>
				<textarea
					id="instructions"
					name="instructions"
					onChange={changeHandler}
					required
				/>

				<label htmlFor="img">Image URL</label>
				<input
					type="text"
					id="img"
					name="img"
					onChange={changeHandler}
					required
				/>
				<label htmlFor="cookingTime">Cooking time (minutes)</label>
				<input
					type="text"
					id="cookingTime"
					name="cookingTime"
					onChange={changeHandler}
					required
				/>
				<button type="submit">Create Recipe</button>
			</form>
		</div>
	);
}
