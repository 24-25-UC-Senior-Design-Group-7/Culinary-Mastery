import './App.css'
import Navbar from "./components/Navbar";

function App() {

  return (
    <div>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/cooking" element={<Cooking />} />
      </Routes>
    </div>
  )
}

export default App
