import React from "react";

function Logout() {
    localStorage.clear();
    window.location.href = "/";
    return (
        <div class="logout">
        </div>
    );
}

export default Logout;