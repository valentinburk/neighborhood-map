import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

/**
 * Map component itself
 */
const MapComponent = withScriptjs(withGoogleMap(props => {
    return <GoogleMap
      defaultZoom={10}
      defaultCenter={props.places.length > 0 ? props.places[0] : {lat: 37.4220, lng: -122.0841}}
      defaultOptions={{mapTypeControl: false}}
      onClick={props.hideInfoWindow}
      >
      {props.isMarkerShown && (props.places.map((place, index) =>
        <Marker
          key={index}
          position={place}
          animation={place.clicked ?
            window.google.maps.Animation.BOUNCE : 0}
          onClick={() => {props.onMarkerClick(index)}} /> ))
      }
    </GoogleMap>
  }
))

/**
 * Map container with map component inside
 */
class Map extends Component {
  render() {
    return <div
      role="region"
      aria-label='map'
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