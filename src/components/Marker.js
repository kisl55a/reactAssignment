import React from 'react';
import Icon from 'react-icons-kit';
import styles from './Main.module.css';

import {batteryFull} from 'react-icons-kit/typicons/batteryFull'
import { batteryCharge } from 'react-icons-kit/typicons/batteryCharge'
export default function Marker(props) {


    return (
        <div>
        
        {(props.type.toLowerCase() ===  "fast") ? 
          <div className = { styles.da }>
          <Icon icon={ batteryCharge } />
      </div> :
       <div className = { styles.da }>
       <Icon icon={ batteryFull } />
   </div> 
        }
        </div>

    )
}

