import './css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './pages/sidebar.jsx';
import Home from './pages/home.jsx'
import Navbar from './components/Navbar';
import Cooking from './pages/cooking.jsx';
import Produce from './pages/produce.jsx';
import Sautee from './pages/sautee.jsx';
import Sear from './pages/sear.jsx';
import International from './pages/international.jsx'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/course-home" element={<Sidebar />} />
          <Route path="/cooking" element={<Cooking />} />
          <Route path="/produce" element={<Produce />} />
          <Route path="/sautee" element={<Sautee />} />
          <Route path="/sear" element={<Sear />} />
          <Route path="/international" element={<International />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
