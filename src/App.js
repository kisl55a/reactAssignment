import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker';
import axios from 'axios';
import styles from './components/Main.module.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MainPage from './components/MainPage';
import Login from './components/Login';
import Registration from './components/Registration';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isLoggedIn: false,
      data: [],
      currentMarker: {},
      center: {
        lat: 65.01,
        lng: 25.49
      },
      zoom: 10,
      Markers: []
    }
  };

  componentDidMount = () =>
  {    
    axios.get('http://localhost:4000/getData').then(result => {
      this.setState({Markers: result.data})
      console.log(this.state.Markers);
    })
    .catch(error => {
      console.error(error);
    })
  }
  register = (username, email, password) => {
    axios.post('http://localhost:4000/signUp', {
      username: username,
      email: email,
      password: password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onDrag = ((map) => {
    console.log('dsadasd')
  })
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
        <Route path="/login" exact render={ routeProps => <Login  {...routeProps} /> }/>
        <Route path="/registration" exact render={ routeProps => <Registration  {...routeProps} register = { this.register } message = '' /> }/>
        <Route path="/" exact render={
          (routeProps) =>
            <MainPage
              currentMarker={ this.state.currentMarker }
              isLoggedIn = { this.state.isLoggedIn }
              />
        } />
        </Router>
        </main>

        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            center={ this.state.center }
            bootstrapURLKeys={{ key: "AIzaSyBQc4fDzvIrxXU2Md73EjyY6oXWspFCMSY" }}
            zoom={ this.state.zoom }
            onChildClick={this._onChildClick}
          >
            { console.log(this.state.zoom)}
            {this.state.Markers.map((item, i) => (
              <Marker key={i} lat={item.lat} lng={item.lng} text={item.stationName} />
            ))
            }
          </GoogleMapReact>
        </div>
      </div>
    );

  }
}

