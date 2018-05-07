import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap(props => {
    return <GoogleMap
      defaultZoom={10}
      defaultCenter={props.places[0]}
      onClick={props.hideInfoWindow}
      >
      {props.isMarkerShown && (props.places.map((place, index) =>
        <div
          key={index}>
            <Marker
              position={place}
              defaultAnimation={window.google.maps.Animation.DROP}
              onClick={(a) => {
                props.onMarkerClick(index);
              }} />
        </div>))}
    </GoogleMap>
  }
))

class Map extends Component {
  render() {
    if (this.props.places.length > 0) {
      return (
        <div className='map-container'>
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
      return <div></div>
    }
  }
}

export default Map;