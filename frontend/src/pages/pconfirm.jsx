import React from "react";
import axios from "axios";
import { useState , useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

function Paid() {

    const {booking_id} = useParams();
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    var booking_url = "http://localhost:5003/booking/getBooking/";

    useEffect(() => {
        const all = async () => {
            await axios.get(booking_url + booking_id)
            .then((response) => {
                console.log(response.data.data);
                setData(response.data.data);
            }
            )
            .catch((error) => {
                console.log(error);
            });
        }
        all();
    }, [booking_id]);

    console.log(data);

    return (
        <div class="paid">
            <img src={require('../images/paid.png')} alt="..."/>
            <h4>Payment Confirmed</h4>
            <p>Hope to see you again!</p>

            <div class="container">
            <div class="tt row">

                <div class="col-6">
                    <div class="card">
                    <div class="card-body">
                        <h3 class="card-title text-center">Your E-receipt</h3>

                        <hr/>
                        
                        <p class="card-text rsname">Restoran Makanan</p>
                        <div className="row">
                            <div className="col-4">
                                <p class="card-text">Date:</p>
                            </div>
                            <div className="col-8">
                                <p class="card-text">21 February 2023, Monday</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <p class="card-text">Time:</p>
                            </div>
                            <div className="col-8">
                                <p class="card-text">7:00pm - 9:00pm</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <p class="card-text">No. of pax:</p>
                            </div>
                            <div className="col-8">
                                <p class="card-text">4</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="row receiptbold">
                            <div className="col-8">
                                <p class="card-text">Items</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">Qty</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">Price</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-8">
                                <p class="card-text">Set meal A</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">x1</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">$10.00</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <p class="card-text">Set meal B</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">x1</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">$10.00</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <p class="card-text">Set meal C</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">x1</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">$10.00</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <p class="card-text">Set meal D</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">x1</p>
                            </div>
                            <div className="col-2">
                                <p class="card-text float-end">$10.00</p>
                            </div>
                        </div>

                        <hr/>

                        <div className="row receiptbold">
                            <div className="col">
                                <p class="card-text">Subtotal (SGD)</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">$40.00</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text">GST (8%)</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">$3.20</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text">Service Charge (10%)</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">$4.00</p>
                            </div>
                        </div>

                        <hr/>

                        <div className="row receiptbold">
                            <div className="col">
                                <p class="card-text">Total (SGD)</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">$47.20</p>
                            </div>
                        </div>

                        <hr/>
                    </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="card">
                    <div class="card-body">
                    <h3 class="card-title text-center">Payment Receipt</h3>
                        <hr/>
            
                        <div className="row receiptbold">
                            <div className="col">
                                <p class="card-text">Customer Name</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">Paid</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text">Customer A</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">$11.80</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text">Customer B</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">$11.80</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text">Customer C</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">$11.80</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text">Customer D</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">$11.80</p>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
}

export default Paid;