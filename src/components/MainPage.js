import React from 'react';
import { Link } from "react-router-dom";
import styles from './Main.module.css';
import StationInfo from './StationInfo';
import BriefStationInfo from './BriefStationInfo';

export default function MainPage(props) {
  function updateSearchFilter (event)
  {
    props.onSearchFilterUpdate(event.target.value)
  }

  return (
    <div className={styles.gridForMenu}>
      <div className={styles.post1}>  
       <h4> Plug here </h4>
       <div>
        <input type="text" onChange={ updateSearchFilter }/>
      </div>
      {(props.isLoggedIn != true) ?
          <div> <Link to="/login">
            <button> Login </button>
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
      <div id="mainInfo" className={ styles.post2 }>
        <div id="infoAboutStation">
          {/* { console.log( props.currentMarker)} */}
        <h3> Choose station on the map or in the list</h3>
      {(props.currentMarker.stationName) ? <StationInfo { ...props.currentMarker }/> : props.resultArray.map((item, i) => (
              <BriefStationInfo key={i} setStation = { props.setStation }  info = {item} />
            ))}
      </div>
      <div id="searchResults">
        
      </div>
        </div>
      
      <div className={styles.post3}> </div>
    </div>
  )
}