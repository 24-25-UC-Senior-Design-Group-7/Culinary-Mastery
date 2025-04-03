import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './contexts/SidebarContext';
import CourseHome from './pages/CourseHome.jsx';
import Home from './pages/home.jsx';
import Navbar from './components/Navbar';
import Cooking from './pages/cooking.jsx';
import Produce from './pages/produce.jsx';
import Sautee from './pages/sautee.jsx';
import Sear from './pages/sear.jsx';
import International from './pages/international.jsx';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <SidebarProvider>
      <Router>
        <div className="app">
          {/* Conditionally render Sidebar based on route */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course-home" element={<Sidebar /> && <CourseHome />} />
            <Route path="/cooking" element={<Sidebar /> && <Cooking />} />
            <Route path="/produce" element={<Sidebar /> && <Produce />} />
            <Route path="/sautee" element={<Sidebar /> && <Sautee />} />
            <Route path="/sear" element={<Sidebar /> && <Sear />} />
            <Route path="/international" element={<Sidebar /> && <International />} />
          </Routes>
        </div>
      </Router>
    </SidebarProvider>
  );
}

export default App;