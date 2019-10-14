import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker';
import axios from 'axios';
import styles from './components/Main.module.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from './components/MainPage';
import Login from './components/Login';
import Registration from './components/Registration';
import StationInfo from './components/StationInfo';

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
      zoom: 13,
      Markers: [],
      arr: [].slice(0,4),
      showSearchResults: false
    }
  };
  
  componentDidMount = () =>
  {    
    axios.get('http://localhost:4000/getData').then(result => {
      this.setState({Markers: result.data})
      this.setState({ arr: result.data})
      
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
  textInputChange = (value) => {
    this.setState({ arr: this.state.Markers.filter(({ stationName }) => stationName.toLowerCase().indexOf(value.toLowerCase()) >= 0) });   
    console.log(this.state.arr);
    this.setState({currentMarker: {}})
    // ( this.state.arr.length != 0) ? this.setState( {showSearchResults: true}) : this.setState( {showSearchResults: false})

  }
  setCurrentStation = (currentStation) => {
    this.setState ({
      currentMarker: currentStation,
      center: {
        lat: currentStation.lat,
        lng: currentStation.lng
      },
      zoom: 14  
    })

  }
  _onChildClick = (key, childProps) => {
    let marker
    console.log(this.props)
    this.state.Markers.forEach(e => {
      if(e.stationName == childProps.text) {
        marker = e
      }
    });
    this.setState({
      center: {
        lat: childProps.lat,
        lng: childProps.lng
      },
      zoom: 14,
      currentMarker: marker,
    })
  }
  render() {
    return (
      <div className={styles.generalGrid}>
        <main>
        <Router>
        <Route path="/station/:id" exact  render={ routeProps => <StationInfo {...routeProps} getInfoAboutStation={ this.getInfoAboutStation } /> } />
        <Route path="/login" exact render={ routeProps => <Login  {...routeProps} /> }/>
        <Route path="/registration" exact render={ routeProps => <Registration  {...routeProps} register = { this.register } message = '' /> }/>
        <Route path="/" exact render={
          (routeProps) =>
            <MainPage
              currentMarker = { this.state.currentMarker }
              isLoggedIn = { this.state.isLoggedIn }
              onSearchFilterUpdate={ this.textInputChange }
              showSearchResults = {this.state.showSearchResults}
              resultArray = { this.state.arr }
              setStation = { this.setCurrentStation }
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

