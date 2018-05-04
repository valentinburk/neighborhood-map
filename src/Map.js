import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap(props => (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={props.places[0]}
      >
      {props.isMarkerShown && (props.places.map((place, index) => <Marker key={index} position={place} />))}
    </GoogleMap>
  )
))

class Map extends Component {
  state = {
    places: [
      { lat: -34.397, lng: 150.644 }
    ]
  }

  render() {
    return (
      <div className='map-container'>
        <MapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2eiZsx2oT_y03EA5ksk4zLCFq0mifCVM&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          places={this.state.places}
        />
      </div>
    );
  }
}

export default Map;
