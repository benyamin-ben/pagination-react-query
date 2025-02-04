import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="nav-container">
      <div style={{display:'flex'}}>
        <div className="link-navbar" id="navbarNav">
          <Link className="nav-link" to="/">
            home
          </Link>
        </div>
        <div className="link-navbar" id="navbarNav">
          <Link className="nav-link" to="/comments">
            Comments
          </Link>
        </div>
      </div>
      <div>
        benyamin
      </div>
    </nav>
  );
}

export default Navbar;
