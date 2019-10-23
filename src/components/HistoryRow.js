import React from 'react';
import styles from './Main.module.css';
export default function HistoryRow(props) {

    return (
        <tr>
            <th>{props.UUID}</th>
            <th>{props.timeOfStart.substr(0,9)}</th>
            <th> { props.energy }</th>
            <th>{props.timeOfUsage} </th>
            <th>{props.cost} </th>
            {/* {console.log(props)} */}
        </tr>
    )
}
