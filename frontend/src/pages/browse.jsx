import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function Browse() {

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
    
    const ShowPosts = (data_keys) => {
        // for each item in array data return one card
        return data.map((item, index) => {
            if (id_list.includes(item._id)) {
                return ( 
                    <div className="col-4">
                    <div class="card card-smaller" >
                        <img src={require('../images/home-banner.jpeg')} />
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
        }
        )
    }

    const [cuisine, setCuisine] = useState("");
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [pax, setPax] = useState("");
    if (data[0] != undefined) {
        var id_list = [];
        //get all id in data
        data.map((each, index) => {
            //add eac._id to idlist
            id_list.push(each._id);
        })

        data.map((item, index) => {

            if (name){
                if (!item._id.toLowerCase().includes(name.toLowerCase())){
                    var temp = id_list.indexOf(item._id);
                    id_list.splice(temp, 1)
                }
            }

            var cuisine_string = item.cuisine.toString();
            var cuisine_lowercase = cuisine_string.toLowerCase();
            if (!cuisine_lowercase.includes(cuisine.toLowerCase())){
                var temp = id_list.indexOf(item._id);
                id_list.splice(temp, 1)
            }

            var availability_keys = Object.keys(item.availability);
            var date_format = date.split("-")
            date_format = date_format[2] + date_format[1] + date_format[0][2] + date_format[0][3]
            if (date_format){
                if (!availability_keys.includes(date_format)){
                    var temp = id_list.indexOf(item._id);
                    id_list.splice(temp, 1)
                }
            } 
    
        })

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
                                <input class="form-control" type="text" placeholder="Name" value={name} onChange={(event) => {setName(event.target.value);}}/>
                                <input class="form-control" type="text" placeholder="Type of cuisine" value={cuisine} onChange={(event) => {setCuisine(event.target.value);}}/>
                                <input class="form-control" type="date" placeholder="Date" value={date} onChange={(event) => {setDate(event.target.value);}}/>
                                {/* <input class="form-control" type="text" placeholder="No. of pax" value={pax} onChange={(event) => {setPax(event.target.value);}}/> */}
                            </form>
                        </div>
                        <div className="col-9">
                            <div className="row">

                                {ShowPosts(id_list)}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Browse;