import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker';
import styles from './components/Main.module.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MainPage from './components/MainPage'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMarker: {},
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11,
      Markers: [
        {
          lat: 59.955413,
          lng: 30.337844,
          text: "da"
        },
        {
          lat: 58.955413,
          lng: 30.337844,
          text: "da",
          available: false
        },
      ]
    }
  };
  _onChildClick = (key, childProps) => {
    console.log(this.state.currentMarker)
    this.setState({
      center: {
        lat: childProps.lat,
        lng: childProps.lng
      },
      zoom: 15,
      currentMarker: childProps,
    })
  }
  render() {
    return (

      <div className={styles.generalGrid}>
        <main>
        <Router>
        <Route path="/" exact render={
          (routeProps) =>
            <MainPage
              currentMarker={ this.state.currentMarker }
             
              />
        } />
        </Router>
        </main>

        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            center={this.state.center}
            bootstrapURLKeys={{ key: "AIzaSyBQc4fDzvIrxXU2Md73EjyY6oXWspFCMSY" }}
            zoom={this.state.zoom}
            onBoundsChange={this._onBoundsChange}
            onChildClick={this._onChildClick}
          >
            {this.state.Markers.map((item, i) => (
              <Marker key={i} lat={item.lat} lng={item.lng} text={item.text} />
            ))
            }
          </GoogleMapReact>
        </div>
      </div>
    );

  }
}

