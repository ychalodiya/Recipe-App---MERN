import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipe from './pages/SavedRecipe';
import Navbar from './components/navbar';
import Login from './pages/login';
import Register from './components/register';

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/create-recipe" element={<CreateRecipe />} />
					<Route path="/saved-recipes" element={<SavedRecipe />} />
				</Routes>
			</Router>
		</div>
	);
}
export default App;
