import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './contexts/SidebarContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CourseHome from './pages/CourseHome';
import Cooking from './pages/cooking';
import Produce from './pages/produce';
import Sautee from './pages/sautee';
import Sear from './pages/sear';
import International from './pages/international';
import CreateCourse from './pages/createCourse';

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-course" element={<CreateCourse />} />

          <Route element={<Layout />}>
            <Route path="/course-home" element={<CourseHome />} />
            <Route path="/cooking" element={<Cooking />} />
            <Route path="/produce" element={<Produce />} />
            <Route path="/sautee" element={<Sautee />} />
            <Route path="/sear" element={<Sear />} />
            <Route path="/international" element={<International />} />
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
