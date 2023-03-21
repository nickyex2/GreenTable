import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";

function Home() {

    const booking_url = "http://localhost:5002/catalog/all";
    
    const [data, setData] = useState([]);

    useEffect(() => {
        const all = async () => {
            await axios.get(booking_url)
            .then(
            response => setData(response.data.data))
        }
        all();
    }, []);
    
    const ShowPosts = () => {

        if (data[0] != undefined) {
            return ( 
                <div className="row">
    
                    <div className="col">
                    <div className="card card-smaller" >
                        <img src={require('../images/home-banner.jpeg')} />
                        <div className="card-body">
                            <div className="row w-100 m-0 hi">
                                <div className="col-6 p-0 hi">
                                    <p className="card-text hi">{data[1].avg_rating} &#9733;</p>
                                </div>
                                <div className="col-6 float-end p-0 hi">
                                    <p className="card-text float-end hi">$$</p>
                                </div>
                            </div>
                            <h5 className="card-title">{data[1]._id}</h5>
                            <p className="card-text">{data[1].location.formatted_address}</p>
                            <p className="card-desc">{data[1].description}</p>
                            <button type="submit" className="search-button">Find out more</button>
                        </div>
                    </div>
                    </div>
    
                    <div className="col">
                    <div className="card card-bigger" >
                        <img src={require('../images/home-banner.jpeg')}  />
                        <div className="card-body">
                            <div className="row w-100 m-0 hi">
                                <div className="col-6 p-0 hi">
                                    <p className="card-text hi">{data[0].avg_rating} &#9733;</p>
                                </div>
                                <div className="col-6 float-end p-0 hi">
                                    <p className="card-text float-end hi">$$</p>
                                </div>
                            </div>
                            <h5 className="card-title">{data[0]._id}</h5>
                            <p className="card-text">{data[0].location.formatted_address}</p>
                            <p className="card-desc">{data[0].description}</p>
                            <button type="submit" className="search-button">Find out more</button>
                        </div>
                    </div>
                    </div>
    
                    <div className="col">
                    <div className="card card-smaller" >
                        <img src={require('../images/home-banner.jpeg')} />
                        <div className="card-body">
                            <div className="row w-100 m-0 hi">
                                <div className="col-6 p-0 hi">
                                    <p className="card-text hi">{data[2].avg_rating} &#9733;</p>
                                </div>
                                <div className="col-6 float-end p-0 hi">
                                    <p className="card-text float-end hi">$$</p>
                                </div>
                            </div>
                            <h5 className="card-title">{data[2]._id}</h5>
                            <p className="card-text">{data[2].location.formatted_address}</p>
                            <p className="card-desc">{data[2].description}</p>
                            <button type="submit" className="search-button">Find out more</button>
                        </div>
                    </div>
                    </div>
    
                </div>
            )
        }
    }

    return (
        <div className="home">
            <div className="home-banner">
                <img src={require('../images/home-banner.jpeg')} alt="home" />
            </div>
            <div className="banner-text">
                <h1>Welcome</h1>
                <p>This is a mini description of what<br/>this website does and our purpose etc</p>
            </div>
            <div className="searchbox">
                <p>Make a booking now!</p>
                <form className="search-form">
                    <input className="form-control" type="text" placeholder="Type of cuisine"/>
                    <input className="form-control" type="text" placeholder="Date"/>
                    <input className="form-control" type="text" placeholder="Time"/>
                    <input className="form-control" type="select" placeholder="No. of pax"/>
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            <div className="latest">
                <p className="header">Check out our latest</p>
    
                <ShowPosts/>

                <div className="who">
                    <p className="header">Who are we?</p>
                    <p className="header-desc">This is a mini description of what our team is blah blah something cute bah</p>
                    <div className="row">
                        <div className="col">
                            <img src={require('../images/home-banner.jpeg')} className="rounded-circle" width="150" height="150"/>
                            <p className="name">Nicholas Goh</p>
                            <p className="role">Role</p>
                        </div>
                        <div className="col">
                            <img src={require('../images/home-banner.jpeg')} className="rounded-circle" width="150" height="150"/>
                            <p className="name">Daniel Lai</p>
                            <p className="role">Role</p>
                        </div>
                        <div className="col">
                            <img src={require('../images/home-banner.jpeg')} className="rounded-circle" width="150" height="150"/>
                            <p className="name">Daryl Yoon</p>
                            <p className="role">Role</p>
                        </div>
                        <div className="col">
                            <img src={require('../images/home-banner.jpeg')} className="rounded-circle" width="150" height="150"/>
                            <p className="name">Nickolaus Chiok</p>
                            <p className="role">Role</p>
                        </div>
                        <div className="col">
                            <img src={require('../images/home-banner.jpeg')} className="rounded-circle" width="150" height="150"/>
                            <p className="name">Colin Mok</p>
                            <p className="role">Role</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;