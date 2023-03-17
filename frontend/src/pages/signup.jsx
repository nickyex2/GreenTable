import React from "react";

function Signup() {
    return (
        <div class="signup">
            <img src={require('../images/login-signup.jpeg')} alt="makan logo" />
            <div className="signupbox">
                <p>Signup</p>
                <form className="search-form">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <input class="form-control" type="text" placeholder="First Name"/>
                                </div>
                                <div className="col-6">
                                    <input class="form-control" type="text" placeholder="Last Name"/>
                                </div>
                            </div>
                            <input class="form-control" type="text" placeholder="Username"/>
                            <input class="form-control" type="Password" placeholder="Password"/>
                            <input class="form-control" type="text" placeholder="Email"/>
                            <input class="form-control" type="numbers" placeholder="Phone"/>
                            <input class="form-control" type="text" placeholder="@Telegram_handle"/>
                        </div>
                        <div className="col-6">
                            <input class="form-control" type="text" placeholder="Credit Card No."/>
                            <div className="row">
                                <div className="col-6">
                                    <input class="form-control" type="numbers" placeholder="Expiry Date"/>
                                </div>
                                <div className="col-6">
                                    <input class="form-control" type="numbers" placeholder="CVV"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="search-button">Lets Go!</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;