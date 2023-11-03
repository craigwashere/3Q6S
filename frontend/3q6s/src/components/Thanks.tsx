import React from 'react';
import { useLocation } from "react-router-dom";


// get userId
const Thanks = () => {
    const location = useLocation();
    const message = location.state.messageToDisplay;
    console.log("Thanks->message", message)

    return (
        <div>
            <h1>{message}</h1>
        </div>
    )
}

export default Thanks