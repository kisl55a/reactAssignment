import React from 'react';
import { Link } from "react-router-dom";
import styles from './Main.module.css';
export default function MainPage(props) {
return (
    <div className={styles.gridForMenu}>
    <div className={styles.post1}> Header and navbar here
      {(props.isLoggedIn != true) ? 
      <div> <Link to="/login">
      <button>Login</button>
    </Link>
     <Link to="/registration">
     <button>Registration</button>
   </Link>  </div>
     : 
          <Link to="/profile">
          <button>Profile</button>
        </Link>
         }
         
    </div>
    <div className={styles.post2}>
      Choosen Object:
{(props.currentMarker) ? props.currentMarker.text : "Object here"}
    </div>
    <div className={styles.post3}> </div>
  </div>
)
}