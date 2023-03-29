import React from "react";

// axios to make http requests to Customer API
import axios from "axios";
import {useRef, useState} from "react";

import { useSessionStorage } from 'react-storage-complete';

function Login() {

    const username = useRef("");
    const password = useRef("");
    const booking_url = "http://localhost:5001/customer/login";

    function storeRedirect() {
        sessionStorage.setItem('name', username.current.value)
        if (sessionStorage.getItem('name') !== 'Business') {
            window.location.href = "http://localhost:3000/";
        }
        else {
            window.location.href = "http://localhost:3000/business";
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            customer_id: username.current.value,
            password: password.current.value
        };
        axios.post(booking_url, data)
            .then((res) => {
                storeRedirect()
            })
            .catch((err) => {
                console.log(err);
                errormsg();
            }
        );

    // function for error message
    function errormsg() {
        const errormsg = document.querySelector(".errormsg");
        errormsg.innerHTML = "Invalid username or password";
        errormsg.style.color = "red";
        errormsg.style.fontSize = "15px";
        errormsg.style.fontWeight = "600";
        errormsg.style.marginTop = "10px";
        errormsg.style.marginBottom = "10px";
    }
    

    };
    return (
        <div className="login">
            <img src={require('../images/login-signup.jpeg')} alt="makan logo" />
            <div className="loginbox">
                <p>Login</p>
                <form className="search-form">
                    <input className="form-control" ref={username} type="text" placeholder="Username"/>
                    <input className="form-control" ref={password} type="Password" placeholder="Password"/>
                    <button type="submit" className="search-button" onClick={handleSubmit}>Lets Go!</button>
                    <div className="errormsg"></div>
                </form>
            </div>
        </div>
    );
}

export default Login;