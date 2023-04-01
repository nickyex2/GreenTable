import React from "react";
import axios from "axios";
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";

function Paid() {

    const {booking_id} = useParams();
    const [data, setData] = useState([]);

    const paid = sessionStorage.getItem('paid');
    var paid_array = null;
    // check if paid has ','
    if (paid.includes(',')){
        paid_array = paid.split(",");
    } 
    else {
        paid_array = [paid];
    }
    for (var i = 0; i < paid_array.length; i++) {
        paid_array[i] = parseFloat(paid_array[i]);
    }

    console.log(paid_array);

    var name = sessionStorage.getItem('name');

    var failed = sessionStorage.getItem('failed');

    // const navigate = useNavigate();

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
    }, [booking_id,booking_url]);

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
        var pricee = parseFloat(price).toFixed(2);
        return pricee;
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

    function getItems(){
        var dict = data.items_ordered.items;
        // loop through dict
        var items = [];
        for (var key in dict) {
            items.push(
                <div className="row" key={key}>
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

    var errormsgs = [];

    function getIndividualPrice(){

        var ppl = [data.customer]
        for (var key in data.pax_details) {
            ppl.push(data.pax_details[key])
        }

        var items = [];
        var count = 0;

        // check type of failed


        console.log(failed);
        console.log(ppl);
        
        if (failed !== null){
            if (failed.includes(',')){
                failed = failed.split(",");
            } 
            else {
                failed = [failed];
            }
            for (var person in ppl){
                if (failed.includes(ppl[person])){
                    errormsgs.push('There is a credit card error for account ' + ppl[person]);
                    var index = ppl.indexOf(ppl[person]);
                    var toAdd = paid_array[index];
                    paid_array[0] += toAdd;
                    paid_array[index] = 0;
                }
            }
        }

        // loop through dict
        for (var keyy in ppl) {
            items.push(
                <div className="row" key={keyy}>
                    <div className="col">
                        <p className="card-text">{ppl[keyy]}</p>
                    </div>
                    <div className="col">
                        <p className="card-text float-end">${formatPrice(paid_array[count])}</p>
                    </div>
                </div>

            );
            count++;
        }
        return items;
    }

    async function updateFeedback() {
        return console.log("update feedback");
    }

    function pError(){
        if (errormsgs.length !== 0){
            return (
                <div id="errormsg">
                    {/* error msgs with <br> in between */}
                    {errormsgs.map((msg) => (
                        <p className="mb-1">{msg}</p>
                    ))}
                    <p className="mb-1">Their respective amounts have been credited to the main booker {name}</p>
                </div>
            )
        }
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
                        </div>
                        </div>
                    </div>

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
                            </div>

                            {getIndividualPrice()}

                            {pError()}

                        </div>
                        </div>

                    </div>
                    </div>
                </div>
                <button type="submit" className="cancelbooking" onClick={updateFeedback}>Submit</button>
            </div>
        );
    }
}

export default Paid;