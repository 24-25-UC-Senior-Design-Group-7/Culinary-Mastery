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
import { AuthProvider } from './contexts/AuthContext';
import Profile from './pages/profile';
import CoursePage from './components/CoursePage'; // Import CoursePage
import MyCourses from './pages/MyCourses';

function App() {
  return (
    <AuthProvider>
    <SidebarProvider>
      <Router>
        <Routes>
          {/* Direct route for Home */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          

          {/* Layout and its child routes including CreateCourse and Profile */}
          <Route element={<Layout />}>
            <Route path="/courses/:id" element={<CoursePage />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/course-home" element={<CourseHome />} />
            <Route path="/cooking" element={<Cooking />} />
            <Route path="/produce" element={<Produce />} />
            <Route path="/sautee" element={<Sautee />} />
            <Route path="/sear" element={<Sear />} />
            <Route path="/international" element={<International />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
