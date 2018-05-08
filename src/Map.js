import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MarkerComponent = (props) => {
  let marker = <Marker
    position={props.place}
    animation={props.animation}
    onClick={() => {
      props.onClick(props.index);
    }} />

  return marker;
}

const MapComponent = withScriptjs(withGoogleMap(props => {
    console.log(props);
    return <GoogleMap
      defaultZoom={10}
      defaultCenter={props.places.length > 0 ? props.places[0] : {lat: 37.4220, lng: -122.0841}}
      defaultOptions={{mapTypeControl: false}}
      onClick={props.hideInfoWindow}
      >
      {props.isMarkerShown && (props.places.map((place, index) =>
        <MarkerComponent
          key={index}
          place={place}
          animation={place.clicked ?
            window.google.maps.Animation.BOUNCE : 0}
          index={index}
          onClick={props.onMarkerClick} /> ))
      }
    </GoogleMap>
  }
))

class Map extends Component {
  render() {
    return <div
      className='map-container'
      style={{marginLeft: '250px'}}>
      <MapComponent
        isMarkerShown={this.props.places.length > 0}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2eiZsx2oT_y03EA5ksk4zLCFq0mifCVM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        places={this.props.places}
        hideInfoWindow={this.props.hideInfoWindow}
        onMarkerClick={this.props.onMarkerClick}
      />
    </div>;
  }
}

export default Map;