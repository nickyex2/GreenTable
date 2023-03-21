import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function Browse() {

    const booking_url = "http://localhost:5002/catalog/all";
    
    const ShowPosts = () => {

        const [data, setData] = useState([]);

        useEffect(() => {
            const all = async () => {
                await axios.get(booking_url)
                .then(
                response => setData(response.data.data))
            }
            all();
        }, []);

        // for each item in array data return one card
        return data.map((item) => {
            return ( 
                <div className="col-4">
                <div class="card card-smaller" >
                    <img src={require('../images/home-banner.jpeg')} alt="" />
                    <div class="card-body">
                        <div className="row w-100 m-0">
                            <div className="col-6 p-0">
                                <p className="card-text">{item.avg_rating} &#9733;</p>
                            </div>
                            <div className="col-6 float-end p-0">
                                <p className="card-text float-end">$$</p>
                            </div>
                        </div>
                        <h5 class="card-title">{item._id}</h5>
                        <p class="card-text">{item.location.formatted_address}</p>
                        <p class="card-desc">{item.description}</p>
                        <Link to={`/pdp/${item._id}`}>
                            <button type="submit" className="search-button">Find out more</button>
                        </Link>
                    </div>
                </div>
                </div>
            )
        }
        )
    }

    return (
        <div className="browse">
            <div className="container">
                <div className="row">
                    <div className="col-3 filter px-4">
                        <div className='row'>
                            <div className="col-6">
                            <p className='float-start'>Filter By</p>
                            </div>
                            <div className="col-6">
                            <p className='float-end'>Clear All</p>
                            </div>
                        </div>  
                        <form className="search-form">
                            <input class="form-control" type="text" placeholder="Type of cuisine"/>
                            <input class="form-control" type="text" placeholder="Date"/>
                            <input class="form-control" type="text" placeholder="Time"/>
                            <input class="form-control" type="text" placeholder="No. of pax"/>
                        </form>
                    </div>
                    <div className="col-9">
                        <div className="row">

                            {ShowPosts()}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Browse;