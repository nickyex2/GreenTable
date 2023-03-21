import React from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

function Pdp() {

    const booking_url = "http://localhost:5002/catalog/find";
    
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

    console.log(data);

    if (data.length !== 0) {
        return (
            <div className="pdp">
                <div className="container">
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
                                <img src={require('../images/home-banner.jpeg')} className='pdpimg' alt=""/>
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
                                        <p className="pdpdesc-desc">+65 1234 5678</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 test mx-3">
                            <div className="pdpbooking">
                                <h5>Find a table</h5>
                                <div className="pdpbox">
                                    <form className="search-form">
                                        <input className="form-control" type="text" placeholder="Date"/>
                                        <input className="form-control" type="text" placeholder="Time"/>
                                        <input className="form-control" type="number" placeholder="No. of pax" min='1' max='10'/>
                                        <button type="submit" className="search-button">Book Now</button>
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