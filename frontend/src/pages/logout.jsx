import React from "react";

function Logout() {
    sessionStorage.clear();
    window.location.href = "/";
    return (
        <div className="logout">
        </div>
    );
}

export default Logout;