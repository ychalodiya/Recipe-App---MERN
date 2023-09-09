import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userModel from '../models/userModel.js';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(401)
			.send('Please enter the required fields: Username & password ');
	}
	try {
		const userExist = await userModel.findOne({ username });
		if (userExist) {
			return res.json({ message: 'Username already exists in the database.' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new userModel({
			username,
			password: hashedPassword,
		});

		await newUser.save();
		res.status(200).json({ message: 'User registred successfully!' });
	} catch (error) {
		console.log(error);
		return res.status(401).send(error.message);
	}
});

userRouter.post('/login', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.json({ message: 'Please enter the username & password' });
	}
	try {
		const userExist = await userModel.findOne({ username });
		if (!userExist) {
			return res.json({ message: "Username doesn't exist in the database." });
		}

		const isPasswordValid = await bcrypt.compare(password, userExist.password);
		if (!isPasswordValid) {
			return res.json({
				message: 'Please enter correct username & password',
			});
		}

		const token = jwt.sign(
			{ id: userExist._id, username },
			process.env.JWT_SECRET
		);

		res.json({ token, id: userExist._id, username });
	} catch (error) {
		console.log(error);
		return res.status(401).send(error.message);
	}
});

export default userRouter;
