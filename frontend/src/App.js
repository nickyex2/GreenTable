import React from 'react';
import './App.css';
import Home from './pages/home';
import Navbar from './components/navbar';
import Login from './pages/login';
import Signup from './pages/signup';
import Pdp from './pages/pdp';
import Confirmation from './pages/confirmation';
import Cancel from './pages/cancel';
import Checkout from './pages/checkout';
import Paid from './pages/pconfirm';

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Browse from './pages/browse';

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      {/* <Browse /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <Pdp /> */}
      {/* <Confirmation /> */}
      {/* <Cancel /> */}
      {/* <Checkout /> */}
      {/* <Paid /> */}
    </div>
  );
}

export default App;
