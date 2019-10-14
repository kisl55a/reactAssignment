import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const StationInfo = (props) => {

  

    return (<div>

        <div >
            <h4>
             {props.stationName}
            </h4>
        </div>

        <div>
            Address: {props.address}
        </div>
        
        <div>
            Type: {props.type}
        </div>
        <div>
            Price: {props.price}<sup>{props.measure}</sup>
        </div>
    </div>)

}

export default StationInfo;