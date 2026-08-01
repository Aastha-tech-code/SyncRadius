import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        SyncRadius
      </div>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Communities</a></li>
        <li><a href="#">Activities</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;