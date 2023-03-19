import React from "react";

function Cancel() {
    return (
        <div class="cancel">
            <img src={require('../images/cancel.png')} alt="..."/>
            <h4>Booking Cancelled</h4>
            <p>We are sad to see you go, head back to continue browsing a right place for you!</p>
        </div>
    );
}

export default Cancel;