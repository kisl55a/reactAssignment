import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const StationInfo = (props) => {
    function back() {
        props.setCurrentStationToNull();
    }
    return (<div>
        <div >
            <h4>
             {props.stationName}
            </h4>
        </div>
        <div>
            Status: {(props.isTaken === 1) ? "taken" : " free"}
        </div>
        <div>
            Address: {props.address}
        </div>
        
        <div>
            Type: {props.type}
        </div>
        <div>
            Power: {props.power} <sup>kWh</sup>
        </div>
        <div>
            Price: {props.price}<sup>{props.measure}</sup>
        </div>
        { (props.isLoggedIn)? 
        <div>  Identifier: { props.UUID }</div> :
        <div></div>    }
        <div> <button onClick = { back }> Back </button></div>
    </div>)

}

export default StationInfo;