import React from "react";
import {useNavigate} from "react-router-dom";

function Logout() {
    sessionStorage.clear();
    const navigate = useNavigate();
    navigate("/");
    return (
        <div className="logout">
        </div>
    );
}

export default Logout;