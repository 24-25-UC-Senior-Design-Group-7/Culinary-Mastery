import './css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import Home from './pages/home.jsx';
import Navbar from './components/Navbar';
import Cooking from './pages/cooking.jsx';
import Produce from './pages/produce.jsx';
import Sautee from './pages/sautee.jsx';
import Sear from './pages/sear.jsx';

function App() {
  return (
    <Router>
      <div> 
        {/* Define Routes using the updated Routes and Route components from React Router v6 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/cooking" element={<Cooking />} />
          <Route path="/produce" element={<Produce />} />
          <Route path="/sautee" element={<Sautee />} />
          <Route path="/sear" element={<Sear />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
