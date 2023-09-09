import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const recipeModel = mongoose.model('recipes', recipeSchema);
export default recipeModel;
