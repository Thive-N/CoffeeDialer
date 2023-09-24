import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home/Home';
import DbChooser from './pages/DbChooser/DbChooser';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<DbChooser />} />
			</Routes>
		</Router>
	);
}
