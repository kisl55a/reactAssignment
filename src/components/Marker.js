import React from 'react';

import styles from './Main.module.css';

export default function Marker(props) {


    return (
        <div>
            {/* {console.log(props)} */}
            {
                (props.type.toLowerCase() === "fast") ?
                (props.isTaken === 0 ? <img className={ styles.station } src={`https://roadmapforth.org/img/Charging.png`}></img> :
                <img className={ styles.stationTaken } src={`https://roadmapforth.org/img/Charging.png`}></img> 
                )
                :
                (props.isTaken === 0 ? <img className={ styles.station } src={`http://cdn.onlinewebfonts.com/svg/img_537309.png`}></img> :
                <img className={ styles.stationTaken } src={`http://cdn.onlinewebfonts.com/svg/img_537309.png`}></img> )

            }
        </div>

    )
}

