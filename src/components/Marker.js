import React from 'react';
import Icon from 'react-icons-kit';
import styles from './Main.module.css';

import { batteryFull } from 'react-icons-kit/typicons/batteryFull'
import { batteryCharge } from 'react-icons-kit/typicons/batteryCharge'
export default function Marker(props) {


    return (
        <div>
            {
                (props.type.toLowerCase() === "fast") ?
                <div  className = {styles.da} style={{width: 90, height: 90}}>
                    <Icon  size={'25%'} icon={batteryCharge} />
                </div> :
                <div className = {styles.da} style={{width: 90, height: 90, color: "#0xB7E0"}}>
                    <Icon size={'25%'} icon={batteryFull} />
                </div>
            }
        </div>

    )
}

