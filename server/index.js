import express from 'express';
import mongoose from 'mongoose';
import recipeRouter from './routes/receipeRoute.js';
import userRouter from './routes/userRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
app.use('/recipes', recipeRouter);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`App is listening on PORT : ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log('There is some problem while connecting to the database.');
		console.log(err);
	});
