import React from "react";
import axios from "axios";
import {useRef} from "react";

function Signup() {
    const firstname = useRef("");
    const lastname = useRef("");
    const username = useRef("");
    const password = useRef("");
    const email = useRef("");
    const phone = useRef("");
    const telegram = useRef("");
    const cardno = useRef("");
    const expiry = useRef("");
    const cvv = useRef("");
    const booking_url = "http://localhost:5001/customer/add";

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            _id: username.current.value,
            password: password.current.value,
            phone: phone.current.value,
            telegram : telegram.current.value,
            email: email.current.value,
            first_name: firstname.current.value,
            last_name: lastname.current.value,
            credit_card: {
                card_number: cardno.current.value ,
                expiration_date: expiry.current.value,
                security_code: cvv.current.value
            }
        };
        axios.post(booking_url, data)
            .then((res) => {
                console.log(res);
                window.location.href = "http://localhost:3000/login"
            })
            .catch((err) => {
                console.log(err);
            }
        );

    };

    return (
        <div className="signup">
            <img src={require('../images/login-signup.jpeg')} alt="makan logo" />
            <div className="signupbox">
                <p>Signup</p>
                <form className="search-form">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <input className="form-control" type="text" placeholder="First Name" ref={firstname}/>
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="text" placeholder="Last Name" ref={lastname}/>
                                </div>
                            </div>
                            <input className="form-control" type="text" placeholder="Username"ref={username}/>
                            <input className="form-control" type="Password" placeholder="Password" ref={password}/>
                            <input className="form-control" type="text" placeholder="Email" ref={email}/>
                            <input className="form-control" type="numbers" placeholder="Phone" ref={phone}/>
                            <input className="form-control" type="text" placeholder="@Telegram_handle" ref={telegram}/>
                        </div>
                        <div className="col-6">
                            <input className="form-control" type="text" placeholder="Credit Card No." minLength={16} ref={cardno}/>
                            <div className="row">
                                <div className="col-6">
                                    <input className="form-control" type="numbers" placeholder="Expiry Date" ref={expiry}/>
                                </div>
                                <div className="col-6">
                                    <input className="form-control" type="numbers" placeholder="CVV" ref={cvv}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="search-button" onClick={handleSubmit}>Lets Go!</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;