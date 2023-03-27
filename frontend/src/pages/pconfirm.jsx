import React from "react";

function Paid() {
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

<<<<<<< Updated upstream
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
=======
    function getItems(){
        var dict = data.items_ordered.items;
        // loop through dict
        var items = [];
        for (var key in dict) {
            items.push(
                <div className="row">
                    <div className="col-8">
                        <p className="card-text">{key}</p>
                    </div>
                    <div className="col-2">
                        <p className="card-text float-end">x{dict[key][0]}</p>
                    </div>
                    <div className="col-2">
                        <p className="card-text float-end">${formatPrice(dict[key][1])}</p>
                    </div>
                </div>
            );
        }

        return items;
    }

    function getIndividualPrice(){
        var ppl = data.pax_details;
        var indiv = getTotal(data.items_ordered.total) / ppl.length;
        var items = [];
        // loop through dict
        for (var key in ppl) {
            items.push(

                <div className="row">
                    <div className="col">
                        <p className="card-text">{ppl[key]}</p>
                    </div>
                    <div className="col">
                        <p className="card-text float-end">${formatPrice(indiv)}</p>
                    </div>
                </div>

            );
        }
        return items;
    }

    console.log(data);
    if (data.length !== 0) {
        return (
            <div className="paid py-5">
                <img src={require('../images/paid.png')} alt="..."/>
                <h4>Payment Confirmed</h4>
                <p>Hope to see you again!</p>

                <div className="container">
                <div className="tt row">

                    <div className="col-6">
                        <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Your E-receipt</h3>

                            <hr/>
                            
                            <p className="card-text rsname">{data.restaurant}</p>
                            <div className="row">
                                <div className="col-4">
                                    <p className="card-text">Date:</p>
                                </div>
                                <div className="col-8">
                                    <p className="card-text">{formatDate(data.date)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p className="card-text">Time:</p>
                                </div>
                                <div className="col-8">
                                    <p className="card-text">{formatTime(data.time)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p className="card-text">No. of pax:</p>
                                </div>
                                <div className="col-8">
                                    <p className="card-text">{data.no_of_pax}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row receiptbold">
                                <div className="col-8">
                                    <p className="card-text">Items</p>
                                </div>
                                <div className="col-2">
                                    <p className="card-text float-end">Qty</p>
                                </div>
                                <div className="col-2">
                                    <p className="card-text float-end">Price</p>
                                </div>
                            </div>

                            {getItems()}

                            <hr/>

                            <div className="row receiptbold">
                                <div className="col">
                                    <p className="card-text">Subtotal (SGD)</p>
                                </div>
                                <div className="col">
                                    <p className="card-text float-end">${formatPrice(data.items_ordered.total)}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <p className="card-text">GST (8%)</p>
                                </div>
                                <div className="col">
                                    <p className="card-text float-end">${formatPrice(getGST(data.items_ordered.total))}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <p className="card-text">Service Charge (10%)</p>
                                </div>
                                <div className="col">
                                    <p className="card-text float-end">${formatPrice(getSC(data.items_ordered.total))}</p>
                                </div>
                            </div>

                            <hr/>

                            <div className="row receiptbold">
                                <div className="col">
                                    <p className="card-text">Total (SGD)</p>
                                </div>
                                <div className="col">
                                    <p className="card-text float-end">${formatPrice(getTotal(data.items_ordered.total))}</p>
                                </div>
                            </div>

                            <hr/>
>>>>>>> Stashed changes
                        </div>

<<<<<<< Updated upstream
                        <div className="row">
                            <div className="col">
                                <p class="card-text">Customer A</p>
                            </div>
                            <div className="col">
                                <p class="card-text float-end">$11.80</p>
=======
                    <div className="col-6">
                        <div className="card">
                        <div className="card-body">
                        <h3 className="card-title text-center">Payment Receipt</h3>
                            <hr/>
                
                            <div className="row receiptbold">
                                <div className="col">
                                    <p className="card-text">Customer Name</p>
                                </div>
                                <div className="col">
                                    <p className="card-text float-end">Paid</p>
                                </div>
>>>>>>> Stashed changes
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