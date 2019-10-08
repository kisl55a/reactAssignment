import React from 'react';
import { Link } from "react-router-dom";
import styles from './Main.module.css';
export default function MainPage(props) {
return (
    <div className={styles.gridForMenu}>
    <div className={styles.post1}> Header and navbar here</div>
    <div className={styles.post2}>
      Choosen Object:
{(props.currentMarker) ? props.currentMarker.text : "Object here"}
    </div>
    <div className={styles.post3}> </div>
  </div>
)
}