import React from 'react';
import styles from './Main.module.css';
export default function HistoryRow(props) {

    return (
        <tr>
            <th>{props.UUID}</th>
            <th>{props.timeOfStart.substr(0,9)}</th>
            <th> { props.energy }</th>
            <th>{props.timeOfUsage} <sup> MIN </sup></th>
            <th>{props.cost} <sup> EUR </sup></th>
            {/* {console.log(props)} */}
        </tr>
    )
}
