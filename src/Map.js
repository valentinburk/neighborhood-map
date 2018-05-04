import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from 'react-geocode';

const Foursquare = require('react-foursquare')({
  clientID: 'DF30QCC2OFQ3EO5L2JYYYZODPV0A4MIDY10HPD0HEI20MOHB',
  clientSecret: 'SAITGGNJVSYI5NTYUCP4P5EDH03L0BENSGIW2LVCE13YUQKL'
});

Geocode.setApiKey('AIzaSyC2eiZsx2oT_y03EA5ksk4zLCFq0mifCVM');

Geocode.fromAddress("Googleplex").then(
  geoResponse => {
    const { lat, lng } = geoResponse.results[0].geometry.location;
    Foursquare.venues.getVenues({
      'll': `${lat},${lng}`,
      'query': 'Company'
    }).then(fsResponse => console.log(fsResponse.response.venues.splice(0, 5)));
  }
);

const MapComponent = withScriptjs(withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={props.places[0]}
      >
      {props.isMarkerShown && (props.places.map((place, index) => <Marker key={index} position={place} />))}
    </GoogleMap>
  )
))

class Map extends Component {
  state = {
    places: [
      { lat: 37.422, lng: -122.084057 }
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