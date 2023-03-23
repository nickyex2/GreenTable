import React from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";



function Pdp() {

    const booking_url = "http://localhost:5002/catalog/find";

    const add_url = "http://localhost:5003//booking/add";
    
    const {restaurant_name} = useParams();

    // take data from backend with restaurant_name using axios get

    const [data, setData] = useState([]);

    useEffect(() => {
        const all = async () => {
            await axios.get(booking_url + '/' + restaurant_name)
            .then(
            response => setData(response.data.data))
        }
        all();
    }, [restaurant_name]);

    // format date to dd/mm/yyyy
    const formatDate = (date) => {
        const day = date.slice(0,2);   
        const month = date.slice(2,4);
        const year = date.slice(4,6);
        return day + '/' + month + '/' + year;
    }

    const [chosenDate, setChosenDate] = useState('');

    // functions to render time based on the date selected

    function renderDates(){
        return Object.keys(data.availability).map((key, index) => {
           return <option value={key}>{formatDate(key)}</option>
        })
    }

    function renderTimes(check){
        if (check !== '')
            return Object.keys(data.availability[chosenDate]).map((key, index) => {
                return <option value={key}>{key}</option>
        })
        else{
            return <option selected value="null" disabled>Please Select A Time</option>
        }
    }

    function handleChange(e){
        setChosenDate(e.target.value);
    }

    function splitPhone(phone){
        return phone.slice(0,4) + ' ' + phone.slice(4,8);
    }

    function checkLogin(){
        if (!sessionStorage.getItem("name")){
            return <Link to={"/login"}><button type="submit" className="search-button align-self-end mt-auto">Login to Book</button></Link>
        }
        else{
            return <Link to={`/confirmation/${data._id}`}><button type="submit" className="search-button align-self-end mt-auto" onClick={addBooking}>Book Now</button></Link>
        }
    }

    function formatBD(date){
        var temp = date.split('/');
        return temp[0] + temp[1] + temp[2][2]+ temp[2][3];
    }

    function addBooking(){
        const booking = {
            restaurant: data._id,
            customer: sessionStorage.getItem("name"),
            // date DDMMYY
            date_created: formatBD(new Date().toLocaleDateString()),
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            no_of_pax: document.getElementById("pax").value,
            pax_details: ['hard', 'code', 'first']
        }
        console.log(booking);
        axios.post(add_url, booking)
        .then(response => console.log('Booking added!'))
        .catch(error => console.log(error))
    }


    if (data.length !== 0) {
        return (
            <div className="pdp">
                <div className="container mt-5">
                    <div className="row pdprow">
                        <div className="col-8 mx-3">
                            <div className="pdpmain">
                                <div className="tt row">
                                    <div className="col">
                                        <h4 className="pdpheaders">{data._id}</h4>
                                    </div>
                                    <div className="col">
                                        <p className="float-end pdpmoney">$$</p>
                                    </div>
                                </div>
                                <img src={data.image[1]} className='pdpimg' alt="/"/>
                            </div>
                            <div className="pdpdesc">
                                <h4 className="pdpheaders">About</h4>
                                <div className="tt row">
                                    <div className="col-8">
                                        <p className="pdpdesc-title">Location</p>
                                        <p className="pdpdesc-desc">{data.location.formatted_address}<br/>Singapore {data.location.postal_code}</p>
                                        <p className="pdpdesc-title">Cuisine</p>
                                        <p className="pdpdesc-desc">{data.cuisine}</p>
                                        <p className="pdpdesc-title">Website</p>
                                        <p className="pdpdesc-desc">{data.website}</p>
                                        <p className="pdpdesc-title">Description</p>
                                        <p className="pdpdesc-desc">{data.description}</p>
                                    </div>
                                    <div className="col-4">
                                        <p className="pdpdesc-title">Opening Hours</p>
                                        <p className="pdpdesc-desc">Mon - Fri: 8am - 10pm<br/>Sat - Sun: 8am - 10pm</p>
                                        <p className="pdpdesc-title">Contact</p>
                                        <p className="pdpdesc-desc">+65 {splitPhone(data.phone)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 test mx-3">
                            <div className="pdpbooking">
                                <h5>Find a table</h5>
                                <div className="pdpbox">
                                    <form className="search-form">
                                        <select onChange={handleChange} id='date'>
                                            <option selected value="null" disabled>Please Select A Date</option>
                                            {renderDates()}
                                        </select>
                                        <select id="time">
                                            {renderTimes(chosenDate)}
                                        </select>
                                        <input type='number' placeholder="No. of Pax" id="pax"/>
                                        <div>
                                            {checkLogin()}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pdp;