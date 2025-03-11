import './css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div> 
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
