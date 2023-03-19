import React from "react";

// function to change all input tag names to disabled == true when split manually button is clicked
function changeDisabled() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
        // change background color of input to grey
        inputs[i].style.backgroundColor = "red";
    }
}


function Checkout() {
    return (
        <div class="checkout">
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
                    <h3 class="card-title text-center">Split Payment</h3>
                        <hr/>
                        <div className="tt row split">
                            <div className="col text-center">
                                <button type="button" class="btn splitbtn">Split Evenly</button>
                            </div>
                            <div className="col text-center">
                                <button type="button" class="btn splitbtn" onClick={changeDisabled()}>Split Manually</button>
                            </div>
                        </div>

                        <div className="row receiptbold">
                            <div className="col">
                                <p class="card-text">Customer Name</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">Amount</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text cn">Customer A</p>
                            </div>
                            <div className="col">
                                <input class="card-text float-end" placeholder='$11.80'/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text cn">Customer B</p>
                            </div>
                            <div className="col">
                                <input class="card-text float-end" placeholder='$11.80' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text cn">Customer C</p>
                            </div>
                            <div className="col">
                                <input class="card-text float-end" placeholder='$11.80' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p class="card-text cn">Customer D</p>
                            </div>
                            <div className="col">
                                <input class="card-text float-end" placeholder='$11.80' />
                            </div>
                        </div>

                        <div className="btndiv text-center">
                            <button type="button" class="btn paybtn">Pay</button>
                        </div>

                    </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
}

export default Checkout;