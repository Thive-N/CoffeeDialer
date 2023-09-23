import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}
