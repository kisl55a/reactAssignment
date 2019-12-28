import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker';
import axios from 'axios';
import styles from './components/Main.module.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Registration from './components/Registration';
import StationInfo from './components/StationInfo';
import Profile from './components/Profile';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userHistory: [],
      message: '',
      isLoggedIn: false,
      idUser: null,
      username: '',
      password: '',
      data: [],
      currentMarker: {},
      center: {
        lat: 65.01,
        lng: 25.49
      },
      zoom: 13,
      Markers: [],
      arr: [],
      showSearchResults: false,
      isCharging: false,
      UUID: "",
      idCharging: "",
      noChargerNotification: "",
      currentCharge: {},
    }
  };
  
  componentDidMount = () => {
    axios.get('http://ec2-18-208-168-179.compute-1.amazonaws.com:4000/getData').then(result => {
      this.setState({ Markers: result.data })
      this.setState({ arr: result.data })
    })
      .catch(error => {
        console.error(error);
      })
  }

  logout = () => {
    this.stopCharging();
    this.setState({
      isLoggedIn: false,
      username: "",
      password: "",
      idUser: null,
      UUID: ""
    })
  }

  login = (username, password) => {
    axios.get('http://ec2-18-208-168-179.compute-1.amazonaws.com:4000/signIn', {
      auth: {
        username: username,
        password: password
      },
    })
      .then(
        response => {
          this.setState({
            isLoggedIn: response.data,
            username: username,
            password: password
          })
          axios.get(`http://ec2-18-208-168-179.compute-1.amazonaws.com:4000/getUserId/${username}`, {
            auth: {
              username: username,
              password: password
            },
          })
            .then(response => {
              this.setState({ idUser: response.data[0].idUser })
              this.getUserHistory();
            })
            .catch(err => {
              console.log(err)

            })

        })
      .catch(error => {
        this.setState({
          message: "Incorrect username or password"
        })
      });
  }

  register = (username, email, password) => {
    console.log(email, password, username)
    axios.post('http://ec2-18-208-168-179.compute-1.amazonaws.com:4000/signUp', {
      username: username,
      email: email,
      password: password
    })
      .then((response) => {
        console.log(response);
        this.setState({ message: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setMessageToNull = () => this.setState({ message: "" })
  textInputChange = (value) => {
    this.setState({ arr: this.state.Markers.filter(({ stationName }) => stationName.toLowerCase().indexOf(value.toLowerCase()) >= 0) });
    // this.setState({ arr : this.state.arr.length = 5})
    this.setState({ currentMarker: {} })
    // ( this.state.arr.length != 0) ? this.setState( {showSearchResults: true}) : this.setState( {showSearchResults: false})
  }

  setCurrentStation = (currentStation) => {
    this.setState({
      currentMarker: currentStation,
      center: {
        lat: currentStation.lat,
        lng: currentStation.lng
      },
      zoom: 16
    })
  }

  setCurrentStationToNull = () => {
    this.setState({ currentMarker: {} })
  }

  refreshData = () => {
    let frequency = 60;
    axios.get(`http://ec2-18-208-168-179.compute-1.amazonaws.com:4000/chargingProcess/${this.state.idCharging}`, {
      auth: {
        username: this.state.username,
        password: this.state.password,
      },
    }).then(response => {
      // console.log(response.data)
      this.setState({ currentCharge: { ...response.data[0] } })
    })
      .catch()
    this.getUserHistory();
    if (this.state.isCharging) {
      setTimeout(this.refreshData, frequency * 1000);
    }
  }

  getUserHistory = () => {
    axios.get(`http://ec2-18-208-168-179.compute-1.amazonaws.com:4000/history/${this.state.idUser}`, {
      auth: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then(response => this.setState({ userHistory: response.data }))
      .catch(error => console.log(error))

  }

  stopCharging = () => {
    this.setState({ isCharging: false })
    axios.get(`http://ec2-18-208-168-179.compute-1.amazonaws.com:4000/stopCharging/${this.state.idCharging}`, {
      auth: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then(response => {
        this.componentDidMount();
      })
      .catch(error => console.log(error))
  }

  startCharging = (UUID) => {
    if (UUID === "") {
      UUID = 0
    }
    axios.get(`http://ec2-18-208-168-179.compute-1.amazonaws.com:4000/startCharging/${UUID}`, {
      auth: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then(
        response => {
          if (response.data !== false) {
            this.setState(
              {
                isCharging: true,
                UUID: UUID,
                idCharging: response.data.id,
                noChargerNotification: ""
              }
            )
            this.refreshData();
            this.componentDidMount();
          } else {
            this.setState({
              noChargerNotification: "No charger with such ID or it's taken already"
            })
          }
        })
      .catch(error => {
        console.error(error);
      });
  }

  _onChildClick = (key, childProps) => {
    let marker
    this.state.Markers.forEach(e => {
      if (e.stationName === childProps.text) {
        marker = e
      }
      // console.log(this.state.userHistory);
    });
    this.setState({
      center: {
        lat: childProps.lat,
        lng: childProps.lng
      },
      zoom: 16,
      currentMarker: marker,
    })
  }

  render() {
    return (
      <div className={styles.generalGrid}>
        <main>
          <Router>
            <Route path="/station/:id" exact render={routeProps => <StationInfo {...routeProps} getInfoAboutStation={this.getInfoAboutStation} />} />
            <Route path="/login" exact render={
              (routeProps) =>
                <Login
                  login={this.login}
                  {...routeProps}
                  username={this.state.username}
                  message={this.state.message}
                  setMessageToNull={this.setMessageToNull}
                />}
            />
            <Route path="/profile" exact render={routeProps => <Profile userHistory={this.state.userHistory} {...routeProps} />} />
            <Route path="/registration" exact render={routeProps =>
              <Registration
                {...routeProps}
                register={this.register}
                message={this.state.message}
                setMessageToNull={this.setMessageToNull}
              />} />
            <Route path="/" exact render={
              (routeProps) =>
                <MainPage
                  logout={this.logout}
                  message={this.state.message}
                  currentMarker={this.state.currentMarker}
                  isLoggedIn={this.state.isLoggedIn}
                  onSearchFilterUpdate={this.textInputChange}
                  showSearchResults={this.state.showSearchResults}
                  resultArray={this.state.arr.slice(0, 7)}
                  setStation={this.setCurrentStation}
                  setCurrentStationToNull={this.setCurrentStationToNull}
                  startCharging={this.startCharging}
                  noChargerNotification={this.state.noChargerNotification}
                  isCharging={this.state.isCharging}
                  UUID={this.state.UUID}
                  idCharging={this.state.idCharging}
                  currentCharge={this.state.currentCharge}
                  stopCharging={this.stopCharging}
                />
            } />
          </Router>
        </main>

        <div className = {styles.map}>
          <GoogleMapReact
            center={this.state.center}
            bootstrapURLKeys={{ key: "AIzaSyBQc4fDzvIrxXU2Md73EjyY6oXWspFCMSY" }}
            zoom={this.state.zoom}
            onChildClick={this._onChildClick}
          >
            {
              this.state.Markers.map((item, i) => (
                <Marker key={i} lat={item.lat} lng={item.lng} isTaken={item.isTaken} type={item.type} text={item.stationName} />
              ))
            }
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
