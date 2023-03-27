import React from "react";

function Logout() {
    sessionStorage.clear();
    window.location.href = "/";
    return (
        <div class="logout">
        </div>
    );
}

export default Logout;