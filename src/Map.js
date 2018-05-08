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
    return <GoogleMap
      defaultZoom={10}
      defaultCenter={props.places[0]}
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
    let map;
    if (this.props.places.length > 0) {
      map = (
        <div
          className='map-container'
          style={{marginLeft: '250px'}}>
          <MapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2eiZsx2oT_y03EA5ksk4zLCFq0mifCVM&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            places={this.props.places}
            hideInfoWindow={this.props.hideInfoWindow}
            onMarkerClick={this.props.onMarkerClick}
          />
        </div>
      );
    } else {
      map = <div></div>
    }

    return map;
  }
}

export default Map;