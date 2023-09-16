import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function Hello() {
	return (
		<div>
			<div className="Hello">
				<img width="200" alt="icon" />
			</div>
			<h1>electron-react-typescript</h1>
		</div>
	);
}

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Hello />} />
			</Routes>
		</Router>
	);
}
