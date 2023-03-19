import React from "react";

function Pdp() {
    return (
        <div className="pdp">
            <div className="container">
                <div className="row pdprow">
                    <div className="col-8 mx-3">
                        <div className="pdpmain">
                            <div className="tt row">
                                <div className="col">
                                    <h4 className="pdpheaders">Restoran Makanan</h4>
                                </div>
                                <div className="col">
                                    <p className="float-end pdpmoney">$$</p>
                                </div>
                            </div>
                            <img src={require('../images/home-banner.jpeg')} className='pdpimg' />
                        </div>
                        <div className="pdpdesc">
                            <h4 className="pdpheaders">About</h4>
                            <div className="tt row">
                                <div className="col-8">
                                    <p className="pdpdesc-title">Location</p>
                                    <p className="pdpdesc-desc">Kampong Glam, Singapore</p>
                                    <p className="pdpdesc-title">Cuisine</p>
                                    <p className="pdpdesc-desc">Bar, Fusion, All-Day Breakfast, Vegetarian Friendly, Cafe</p>
                                    <p className="pdpdesc-title">Website</p>
                                    <p className="pdpdesc-desc">Website link</p>
                                    <p className="pdpdesc-title">Description</p>
                                    <p className="pdpdesc-desc">Arab St Cantina takes on an Asian Farm to Table concept with an aim to support locals, have minimal food wastage, and keep it real without compromising on flavor. Our dishes are of inspirations by the chef's background, experiences, and travels. Cantina is Crane’s first Cafe located in Singapore’s iconic Kampong Glam. With Crane’s foundation of being an encouraging platform for people to grow and self-discover, Arab St Cantina encompasses those values of showcasing creativeness and passion for the food created. (Feb 2023)</p>
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
                                    <input class="form-control" type="text" placeholder="Date"/>
                                    <input class="form-control" type="text" placeholder="Time"/>
                                    <input class="form-control" type="number" placeholder="No. of pax" min='1' max='10'/>
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

export default Pdp;