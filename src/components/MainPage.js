import React from 'react';
import { Link } from "react-router-dom";
import styles from './Main.module.css';
import StationInfo from './StationInfo';
import BriefStationInfo from './BriefStationInfo';
import Charging from './Charging'

export default function MainPage(props) {
  function updateSearchFilter (event)
  {
    props.onSearchFilterUpdate(event.target.value)
  }

  return (
    <div className={styles.gridForMenu}>
      <div className={styles.post1}>  
       <h4> Plug here </h4>
       <br></br>
       
       
      
      {(props.isLoggedIn !== true) ?
          <div> <div> { props.message }</div>
          <Link to="/login">
            <button> Login </button>
          </Link>
            <Link to="/registration">
              <button>Registration</button>
            </Link>   </div>
           
          :
          <div> 
          <Link to="/profile">
            <button>Profile</button>
          </Link>
          <button onClick = { props.logout }>Logout</button>
          </div>
        }

      </div>
      <div id="mainInfo" className={ styles.post2 }>
        <div id="infoAboutStation">
          <h4>Search</h4>
        <input type="text" onChange={ updateSearchFilter }/>
        <h3> Choose station on the map, in the list</h3>
      {(props.currentMarker.stationName) ? <StationInfo { ...props.currentMarker } setCurrentStationToNull = { props.setCurrentStationToNull } isLoggedIn = { props.isLoggedIn }/> 
      : props.resultArray.map((item, i) => (
              <BriefStationInfo key={i} setStation = { props.setStation } setCurrentStationToNull = { props.setCurrentStationToNull }  info = {item} />
            ))}
      </div>
      <br></br>
     
        </div>
       
      <div className={styles.post3}> 
      {(props.isLoggedIn) 
      ? <Charging 
      startCharging = { props.startCharging } 
      noChargerNotification = { props.noChargerNotification } 
      isCharging = { props.isCharging }
      idCharging = { props.idCharging }
      UUID = { props.UUID }
      currentCharge = { props.currentCharge }
      stopCharging = { props.stopCharging }
      />
      : "You can start charging when you are logged in"}
     
      </div>
    </div>
  )
}