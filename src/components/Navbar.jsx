import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/home">Home</Link> | 
      <Link to="/sidebar">Sidebar</Link> |
      <Link to="/cooking">Cooking</Link> | 
    </nav>
  );
};

export default Navbar;