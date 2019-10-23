import React from 'react';
import styles from './Main.module.css';

const StationInfo = (props) => {

    function setCurrentStation() {
           props.setStation(props.info)
    }

    return (<div className = { styles.zebra }>

        <div className = { styles.searchRes } onClick={setCurrentStation}>
            {props.info.stationName}
        </div>
    </div>)

}

export default StationInfo;