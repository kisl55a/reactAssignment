import React from 'react';
import { compileFunction } from 'vm';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const StationInfo = (props) => {

    function setCurrentStation() {
           props.setStation(props.info)
    }

    return (<div>

        <div onClick={setCurrentStation}>
            {props.info.stationName}
        </div>
    </div>)

}

export default StationInfo;