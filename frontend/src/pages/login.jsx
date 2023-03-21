import React from "react";

// axios to make http requests to Customer API
import axios from "axios";
import {useRef} from "react";

function Login() {

    const username = useRef("");
    const password = useRef("");
    const booking_url = "http://localhost:5001/customer/login";

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            customer_id: username.current.value,
            password: password.current.value
        };
        axios.post(booking_url, data)
            .then((res) => {
                console.log(res);
                window.location.href = "http://localhost:3000/"
            })
            .catch((err) => {
                console.log(err);
            }
        );
    

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
                </form>
            </div>
        </div>
    );
}

export default Login;