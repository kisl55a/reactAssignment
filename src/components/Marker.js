import React from 'react';
import Icon from 'react-icons-kit';
import styles from './Main.module.css';

import { batteryCharging } from 'react-icons-kit/ionicons/batteryCharging'
import {batteryFull} from 'react-icons-kit/ionicons/batteryFull'
import { batteryCharge } from 'react-icons-kit/typicons/batteryCharge'
import { BrowserRouter as Link } from "react-router-dom";
export default function Marker(props) {


    return (
        <div>
         { console.log(props)}
                <div className = { styles.da }>
                    <Icon icon={batteryCharge} />
                </div>
            

        </div>

    )
}

