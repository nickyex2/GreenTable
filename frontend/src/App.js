import React from 'react';
import './App.css';
import Home from './pages/home';
import Navbar from './components/navabr';
import Login from './pages/login';
import Signup from './pages/signup';

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Browse from './pages/browse';

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Home /> */}
      {/* <Browse /> */}
      {/* <Login /> */}
      <Signup />
    </div>
  );
}

export default App;
