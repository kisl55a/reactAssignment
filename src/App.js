import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker';
import styles from './components/Main.module.css';
import shouldPureComponentUpdate from 'react-pure-render/function';

import controllable from 'react-controllables';

// @controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
// var React = require('react');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11,
      Markers : [ 
        {
          lat: 59.955413, 
          lng:30.337844,
          text: "da"
        },
        {
          lat: 58.955413, 
          lng:30.337844,
          text: "da",
          available: false
        },
      ]
    }
  };
  // TODO find out how to change the location
 



  // _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event)

  _onChildClick = (key, childProps) => {
    this.setState({
      center: {
        lat: childProps.lat,
        lng: childProps.lng
      },
      zoom: 11
    })
  }
  render() {
    return (
      <div className = { styles.grid }>
        <div>
          some shit here
        </div>
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          center={this.state.center}
          bootstrapURLKeys={{ key: "AIzaSyBQc4fDzvIrxXU2Md73EjyY6oXWspFCMSY" }}
          zoom={this.state.zoom}
          onBoundsChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
        >
          {this.state.Markers.map((item, i) => (
            <Marker key={i} lat = { item.lat } lng = { item.lng } text ={ item.text }/>
            ))
        }
        {console.log(this.state)}
        </GoogleMapReact>
      </div>
      </div>


    );

  }
}

