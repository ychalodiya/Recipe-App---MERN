import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipe from './pages/SavedRecipe';
import Navbar from './components/navbar';
import Login from './pages/login';
import Register from './components/register';
import { useCookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [cookies] = useCookies('access_token');

	return (
		<div className="App">
			<ToastContainer />
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{cookies?.access_token && (
						<>
							<Route path="/saved-recipes" element={<SavedRecipe />} />
							<Route path="/create-recipe" element={<CreateRecipe />} />
						</>
					)}

					<Route path="/saved-recipes" element={<Navigate to="/login" />} />
					<Route path="/create-recipe" element={<Navigate to="/login" />} />
					<Route path="/*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</div>
	);
}
export default App;
