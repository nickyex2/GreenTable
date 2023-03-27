import React from "react";
import axios from "axios";
import { useState , useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

function Checkout() {
    const {booking_id} = useParams();
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    var booking_url = "http://localhost:5003/booking/getBooking/";

    var pay_url = "http://localhost:5007/make_payment";

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

    function changeDisabledTrue() {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
            // change background color of input to grey
            inputs[i].style.backgroundColor = "#D3D3D3";
        }
        document.getElementById("splitbtn").style.setProperty ("color", "white", "important");
        document.getElementById("splitbtn").style.setProperty ("background-color", "#122526", "important");
        document.getElementById("splitbtn2").style.setProperty ("color", "#122526", "important");
        document.getElementById("splitbtn2").style.setProperty ("background-color", "white", "important");
    }

    function changeDisabled() {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
            // change background color of input to grey
            inputs[i].style.backgroundColor = "#fff";
            inputs[i].style.border = "1px solid #D3D3D3";
        }
        // switch splitbtn and splitbtn2 css
        document.getElementById("splitbtn2").style.setProperty ("color", "white", "important");
        document.getElementById("splitbtn2").style.setProperty ("background-color", "#122526", "important");
        document.getElementById("splitbtn").style.setProperty ("color", "#122526", "important");
        document.getElementById("splitbtn").style.setProperty ("background-color", "white", "important");

    }

    function formatDate (date) {
        const day = date.slice(0,2);   
        const month = date.slice(2,4);
        const year = date.slice(4,6);
        // get month name
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var monthIndex = month - 1;
        var monthName = monthNames[monthIndex];
        //get day of the week
        var d = new Date(year, month, day);
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var n = weekday[d.getDay()];
        return day + ' ' + monthName + ' 20' + year + ', ' + n;
    }

    function formatTime (time) {
        // am pm time
        const hour = time.slice(0,2);
        const min = time.slice(2,4);
        var ampm = hour >= 12 ? 'pm' : 'am';
        var hour12 = hour % 12;
        hour12 = hour12 ? hour12 : 12; // the hour '0' should be '12'
        var strTime = hour12 + ':' + min + ' ' + ampm;
        return strTime;
    }

    function formatPrice(price) {
        var price = price.toFixed(2);
        return price;
    }

    function getItems(){
        var dict = data.items_ordered.items;
        // loop through dict
        var items = [];
        for (var key in dict) {
            items.push(
                <div className="row">
                    <div className="col-8">
                        <p class="card-text">{key}</p>
                    </div>
                    <div className="col-2">
                        <p class="card-text float-end">x{dict[key][0]}</p>
                    </div>
                    <div className="col-2">
                        <p class="card-text float-end">${formatPrice(dict[key][1])}</p>
                    </div>
                </div>
            );
        }

        return items;
    }

    function getGST(price){
        var gst = price * 0.08;
        return gst;
    }

    function getSC(price){
        var sc = price * 0.1;
        return sc;
    }

    function getTotal(price){
        var total = parseFloat(price) + parseFloat(getGST(price)) + parseFloat(getSC(price));
        return total;
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
                        <p class="card-text cn names" value={ppl[key]}>{ppl[key]}</p>
                    </div>
                    <div className="col">
                        <input class="card-text float-end topays" value={formatPrice(indiv)} disabled placeholder={formatPrice(indiv)}/>
                    </div>
                </div> 
            );
        }
        return items;
    }

    // {
    //     "booking_id": "2",
    //     "total_amount": 600,
    //     "main_customer": {
    //         "name": "nicholas",
    //         "amount": 100
    //     },
    //     "other_customers": [
    //         {
    //             "name": "daryl",
    //             "amount": 200
    //         },
    //         {
    //             "name": "chiok",
    //             "amount": 300
    //         }
    //     ]
    // }

    async function makePayment(){
        var temp = [];
        var names = document.getElementsByClassName("names");
        var topays = document.getElementsByClassName("topays");
        for (var i = 1; i < names.length; i++) {
            var obj = {
                name: names[i].innerHTML,
                amount: parseFloat(topays[i].value)
            }
            temp.push(obj);
        }

        var info = {
            booking_id: booking_id,
            total_amount: parseFloat(formatPrice(getTotal(data.items_ordered.total))),
            main_customer: {
                name: document.getElementsByClassName("names")[0].innerHTML,
                amount: parseFloat(document.getElementsByClassName("topays")[0].value)
            },
            other_customers: temp
        }

        console.log(info);

        await axios.post(pay_url, info)
        .then((res) => {
            console.log(res.data);
            navigate("/pconfirm/" + booking_id);
        })
        .catch((err) => {
            console.log(err);
        })
    }


    if (data.length !== 0) {
        return (
            <div class="checkout">
                <div class="container">
                <div class="tt row">

                    <div class="col-6">
                        <div class="card">
                        <div class="card-body">
                            <h3 class="card-title text-center">Your E-receipt</h3>

                            <hr/>
                            
                            <p class="card-text rsname">{data.restaurant}</p>
                            <div className="row">
                                <div className="col-4">
                                    <p class="card-text">Date:</p>
                                </div>
                                <div className="col-8">
                                    <p class="card-text">{formatDate(data.date)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p class="card-text">Time:</p>
                                </div>
                                <div className="col-8">
                                    <p class="card-text">{formatTime(data.time)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p class="card-text">No. of pax:</p>
                                </div>
                                <div className="col-8">
                                    <p class="card-text">{data.no_of_pax}</p>
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
       
                            {getItems()}

                            <hr/>

                            <div className="row receiptbold">
                                <div className="col">
                                    <p class="card-text">Subtotal (SGD)</p>
                                </div>
                                <div className="col">
                                    <p class="card-text float-end">${formatPrice(data.items_ordered.total)}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <p class="card-text">GST (8%)</p>
                                </div>
                                <div className="col">
                                    <p class="card-text float-end">${formatPrice(getGST(data.items_ordered.total))}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <p class="card-text">Service Charge (10%)</p>
                                </div>
                                <div className="col">
                                    <p class="card-text float-end">${formatPrice(getSC(data.items_ordered.total))}</p>
                                </div>
                            </div>

                            <hr/>

                            <div className="row receiptbold">
                                <div className="col">
                                    <p class="card-text">Total (SGD)</p>
                                </div>
                                <div className="col">
                                    <p class="card-text float-end" id="totalprice">${formatPrice(getTotal(data.items_ordered.total))}</p>
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
                                    <button type="button" class="btn splitbtn" id="splitbtn" onClick={changeDisabledTrue}>Split Evenly</button>
                                </div>
                                <div className="col text-center">
                                    <button type="button" class="btn splitbtn2" id="splitbtn2" onClick={changeDisabled}>Split Manually</button>
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

                            {getIndividualPrice()}

                            <div className="btndiv text-center">
                                <button type="button" class="btn paybtn" onClick={async (e) => {
                                    e.preventDefault();
                                    await makePayment();
                                }}>Pay</button>
                            </div>

                        </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout;