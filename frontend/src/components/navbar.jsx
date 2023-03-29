import React from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation()

    if(location.pathname === '/login' || location.pathname === '/signup') {
      return null
    }

    var username = sessionStorage.getItem('name');

    function history(username){
      if(username){
        return(
          <a className="navbarlinks" href="/history">History</a>
        )
      }
    }

    return (
        <nav className="navbar">
        <div className="container-fluid">
          <div className="links">
            <a className="navbar-brand" href="/">GreenTable</a>
            <a className="navbarlinks" href="/">Home</a>
            <a className="navbarlinks" href="/browse">Booking</a>
            <a className="navbarlinks" href="/login">Login</a>
            <a className="navbarlinks" href="/signup">Signup</a>
            <a className="navbarlinks" href="/logout">Logout</a>
            {history(username)}
          </div>
          {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
        </div>
      </nav>
    );
}

export default Navbar;