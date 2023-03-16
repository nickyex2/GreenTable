import React from "react";

function Home() {
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
                    <input class="form-control" type="text" placeholder="Type of cuisine"/>
                    <input class="form-control" type="text" placeholder="Date"/>
                    <input class="form-control" type="text" placeholder="Time"/>
                    <input class="form-control" type="text" placeholder="No. of pax"/>
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            <div className="latest">
                <p className="header">Check out our latest</p>
                <div className="row">

                    <div className="col">
                    <div class="card card-smaller" >
                        <img src={require('../images/home-banner.jpeg')} />
                        <div class="card-body">
                            <div className="row w-100 m-0 hi">
                                <div className="col-6 p-0 hi">
                                    <p className="card-text hi">4.5 &#9733;</p>
                                </div>
                                <div className="col-6 float-end p-0 hi">
                                    <p className="card-text float-end hi">$$</p>
                                </div>
                            </div>
                            <h5 class="card-title">Restoran Makanan</h5>
                            <p class="card-text">Kampong Glam, Singapore</p>
                            <p class="card-desc">A short description of what the restaurant is about, what food they sell and the vibes and idk what else maybe abience</p>
                            <button type="submit" className="search-button">Find out more</button>
                        </div>
                    </div>
                    </div>

                    <div className="col">
                    <div class="card card-bigger" >
                        <img src={require('../images/home-banner.jpeg')}  />
                        <div class="card-body">
                            <div className="row w-100 m-0 hi">
                                <div className="col-6 p-0 hi">
                                    <p className="card-text hi">4.5 &#9733;</p>
                                </div>
                                <div className="col-6 float-end p-0 hi">
                                    <p className="card-text float-end hi">$$</p>
                                </div>
                            </div>
                            <h5 class="card-title">Restoran Makanan</h5>
                            <p class="card-text">Kampong Glam, Singapore</p>
                            <p class="card-desc">A short description of what the restaurant is about, what food they sell and the vibes and idk what else maybe abience</p>
                            <button type="submit" className="search-button">Find out more</button>
                        </div>
                    </div>
                    </div>

                    <div className="col">
                    <div class="card card-smaller" >
                        <img src={require('../images/home-banner.jpeg')} />
                        <div class="card-body">
                            <div className="row w-100 m-0 hi">
                                <div className="col-6 p-0 hi">
                                    <p className="card-text hi">4.5 &#9733;</p>
                                </div>
                                <div className="col-6 float-end p-0 hi">
                                    <p className="card-text float-end hi">$$</p>
                                </div>
                            </div>
                            <h5 class="card-title">Restoran Makanan</h5>
                            <p class="card-text">Kampong Glam, Singapore</p>
                            <p class="card-desc">A short description of what the restaurant is about, what food they sell and the vibes and idk what else maybe abience</p>
                            <button type="submit" className="search-button">Find out more</button>
                        </div>
                    </div>
                    </div>

                </div>

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