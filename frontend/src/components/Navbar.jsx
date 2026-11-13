import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        SyncRadius
      </Link>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href="#features">Communities</a>
        </li>

        <li>
          <a href="#how-it-works">Activities</a>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;