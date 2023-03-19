import React from "react";

function Navbar() {
    return (
        <nav class="navbar">
        <div class="container-fluid">
          <div className="links">
            <a class="navbar-brand" href="/">GreenTable</a>
            <a class="navbarlinks" href="/">Home</a>
            <a class="navbarlinks" href="/browse">Booking</a>
            <a class="navbarlinks" href="/login">Login</a>
            <a class="navbarlinks" href="/signup">Signup</a>
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