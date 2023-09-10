import express from 'express';
import recipeModel from '../models/recipeModel.js';
import userModel from '../models/userModel.js';

const recipeRouter = express.Router();

recipeRouter.get('/', async (req, res) => {
	try {
		const response = await recipeModel.find({});
		return res.json(response);
	} catch (err) {
		return res.json({ message: 'Unable to fetch the recipes' });
	}
});

recipeRouter.post('/', async (req, res) => {
	try {
		const newRecipe = new recipeModel(req.body);
		await newRecipe.save();
		return res
			.status(200)
			.json({ message: 'New Recipe registred successfully!', newRecipe });
	} catch (err) {
		return res.status(401).send({ message: err.message });
	}
});

recipeRouter.put('/', async (req, res) => {
	try {
		const recipe = await recipeModel.findById(req.body.recipeId);
		const user = await userModel.findById(req.body.userId);
		user.savedRecipes.push(recipe);
		await user.save();
		return res.status(200).json({
			message: 'New Recipe saved successfully!',
			savedRecipes: user.savedRecipes,
		});
	} catch (err) {
		return res.status(401).send({ message: err.message });
	}
});

recipeRouter.get('/savedRecipes/ids/:userId', async (req, res) => {
	try {
		const user = await userModel.findById(req.params.userId);
		return res.status(200).json({
			message: 'Here is the list of saved recipes',
			savedRecipes: user?.savedRecipes,
		});
	} catch (err) {
		return res.status(401).send({ message: err.message });
	}
});

recipeRouter.get('/savedRecipes/:userId', async (req, res) => {
	try {
		const user = await userModel.findById(req.params.userId);
		const savedRecipes = await recipeModel.find({
			_id: { $in: user.savedRecipes },
		});

		res.status(200).json({
			savedRecipes,
		});
	} catch (err) {
		return res.status(401).send({ message: err.message });
	}
});

export default recipeRouter;
