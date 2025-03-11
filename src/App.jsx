import './css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './pages/Sidebar';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        {/* Main navigation */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sidebar">Sidebar</Link></li>
          </ul>
        </nav>
        
        {/* Define Routes using the updated Routes and Route components from React Router v6 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
