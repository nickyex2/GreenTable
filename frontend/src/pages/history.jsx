import React from "react";
import axios from "axios";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

function History() {

    var username = sessionStorage.getItem('name');

    var booking_url = "http://localhost:5003/booking/getBookings/";

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const all = async () => {
            await axios.get(booking_url + username)
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
    }, [username]);

    function goPayment(booking_id) {
        navigate(`/checkout/${booking_id}`)
    }

    function formatStatus(status) {
        if (status === false) {
            return "Waiting for payment";
        } else {
            return "Paid";
        }
    }

    function formatStatusPayment(status, booking_id) {
        if (status.length === 0) {
            return "Food not ordered";
        } else {
            return <button type="button" class="btn btn-light" onClick={goPayment(booking_id)}>Ready For Payment!</button>;
        }
    }

    function getAll() {
        // loop through data and display all bookings in a table
        return (
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">Restaurant</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Number of people</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((booking) => (
                        <tr>
                            <th scope="row">{booking._id}</th>
                            <td>{booking.restaurant}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.no_of_pax}</td>
                            <td>{formatStatus(booking.paid_status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    function getPaid(){
        var newArray = data.filter(function (el) {
            return el.paid_status === true;
        });
        return (
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Number of people</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {newArray.map((each) => (
                    <tr>
                        <th scope="row">{each._id}</th>
                        <td>{each.restaurant}</td>
                        <td>{each.date}</td>
                        <td>{each.time}</td>
                        <td>{each.no_of_pax}</td>
                        <td>{formatStatus(each.paid_status)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        );
    }

    function getPending(){
        var newArray = data.filter(function (el) {
            return el.paid_status === false;
        });
        return (
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Number of people</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {newArray.map((each) => (
                    <tr>
                        <th scope="row">{each._id}</th>
                        <td>{each.restaurant}</td>
                        <td>{each.date}</td>
                        <td>{each.time}</td>
                        <td>{each.no_of_pax}</td>
                        <td>{formatStatusPayment(each.items_ordered, each._id)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        );
    }

    if (data.length !== 0) {
        return (
            <div className="history">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">All</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Paid</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Waiting for payment</button>
                    </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">{getAll()}</div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">{getPaid()}</div>
                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">{getPending()}</div>
                    </div>
            </div>
        );
    }
}

export default History;