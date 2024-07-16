import React, { useState } from "react";
import "../CSS/Navbar.css";

import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        <img className="ImageNavbrsixecontrol" src="/images/logo.png" alt="" />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
        <li>
          <NavLink to="/Services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/Works">Our Works</NavLink>
        </li>
        <li>
          <NavLink to="/ContactUs">Contact Us</NavLink>
        </li>
      </ul>
    </nav>
  );
};
