import React from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation()

    if(location.pathname === '/login' || location.pathname === '/signup') {
      return null
    }

    var username = localStorage.getItem('name');

    return (
        <nav className="navbar">
        <div className="container-fluid">
          <div className="links">
            <a className="navbar-brand" href="/">GreenTable</a>
            <a className="navbarlinks" href="/">Home</a>
            <a className="navbarlinks" href="/browse">Booking</a>
            <a className="navbarlinks" href="/login">Login</a>
            <a className="navbarlinks" href="/signup">Signup</a>
            <a className="navbarlinks" href="/signup">Logout</a>
          </div>
          {/* <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> */}
        </div>
      </nav>
    );
}

export default Navbar;