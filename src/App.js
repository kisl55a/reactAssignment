import React, {PropTypes, Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker';
import styles from './components/Main.module.css';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  // static propTypes = {
  //   onCenterChange: PropTypes.func, // @controllable generated fn
  // };

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event)
  _onChildClick = (key, childProps) => {
    console.log(childProps);
    // this.props.onCenterChange([childProps.lat, childProps.lng]);
  }
  render() {
    return (
      <div className = { styles.grid }>
        <div>
          some shit here
        </div>
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBQc4fDzvIrxXU2Md73EjyY6oXWspFCMSY" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick = { this._onClick }
          onChildClick = { this._onChildClick }
        >
          {this.state.Markers.map((item, i) => (
            <Marker key={i} lat = { item.lat} lng = { item.lng} text ={ item.text }/>
           
            ))
        }
        {console.log(this.state)}
          {/* <Marker
          
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </div>
      </div>


    );

  }
}

