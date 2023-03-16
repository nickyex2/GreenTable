import React from "react";

function Login() {
    return (
        <div class="login">
            <img src={require('../images/login-signup.jpeg')} alt="makan logo" />
            <div className="loginbox">
                <p>Login</p>
                <form className="search-form">
                    <input class="form-control" type="text" placeholder="Username"/>
                    <input class="form-control" type="Password" placeholder="Password"/>
                    <button type="submit" className="search-button">Lets Go!</button>
                </form>
            </div>
        </div>
    );
}

export default Login;