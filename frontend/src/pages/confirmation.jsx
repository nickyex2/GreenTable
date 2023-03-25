import React from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

function Confirmation() {

    const {booking_id} = useParams();

    return (
        <div class="confirmation">
            <img src={require('../images/confirm.png')} alt="..."/>
            <h4>Booking Confirmed</h4>
            <p>Check your details below</p>

            <div class="container-fluid">
            <div class="tt row">

                <div class="col-6">
                    <div class="card carded">
                    <div class="card-body">
                        <h3 class="card-title">Booking Details</h3>
                        <hr/>
                        <p class="card-text"><b>Restaurant:</b><br/>Restoran Makanan</p>
                        <p class="card-text"><b>Location:</b><br/>Kampong Glam, Singapore 123456</p>
                        <p class="card-text"><b>Time:</b><br/>7:00pm - 9:00pm</p>
                        <p class="card-text"><b>No. of pax:</b><br/>4</p>
                        <p class="card-text"><b>Date:</b><br/>21 February 2023, Monday</p>
                    </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="card cardbd">
                    <div class="card-body">
                    <h3 class="card-title">Personal Details</h3>
                        <hr/>
                        <p class="card-text"><b>Booker Name:</b><br/>John Doe</p>
                        <p class="card-text"><b>Email:</b><br/>johndoe@spvglobal.io</p>
                        <p class="card-text"><b>Mobile:</b><br/>+65 8123 4567</p>
                    </div>
                    </div>
                </div>

                </div>
            </div>

            <button type="submit" className="cancelbooking">Cancel booking</button>
        </div>
    );
}

export default Confirmation;