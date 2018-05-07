import React, { Component } from 'react';
import List from './List';
import Map from './Map';
import InfoWindow from './InfoWindow';
import './App.css';

const FOURSQUARE = require('react-foursquare')({
  clientID: 'DF30QCC2OFQ3EO5L2JYYYZODPV0A4MIDY10HPD0HEI20MOHB',
  clientSecret: 'SAITGGNJVSYI5NTYUCP4P5EDH03L0BENSGIW2LVCE13YUQKL'
});

class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }

  getInfo = (place) => {
    return FOURSQUARE.venues.getVenue({
      'venue_id': place.id
    })
  }

  setMarkers = (places) => {
    this.setState({ places });
  }

  onMarkerClick = (marker) => {
    const places = this.state.places.map((p, index) => {
      if (index === marker) {
        p.clicked = true;
      } else {
        p.clicked = false;
      }
      return p;
    });

    this.getInfo(this.state.places[marker])
      .then(fsResponse => {
        this.setState({
          places: places,
          selectedPlace: fsResponse.response.venue
        });
      });
  }

  hideInfoWindow = () => {
    const places = this.state.places.map((p, index) => {
      p.clicked = false;
      return p;
    });

    this.setState({ places: places, selectedPlace: null });
  }

  render() {
    console.log(this.state.places);
    return (
      <div className='app-container'>
        <List
          foursquare={FOURSQUARE}
          setMarkers={this.setMarkers}
          onPlaceClick={this.onMarkerClick} />
        <Map
          places={this.state.places.map(v => {
            return { lat: v.location.lat, lng: v.location.lng, clicked: v.clicked }
          })}
          hideInfoWindow={this.hideInfoWindow}
          onMarkerClick={this.onMarkerClick} />
        <InfoWindow
          place={this.state.selectedPlace}
          foursquare={FOURSQUARE}
          hideInfoWindow={this.hideInfoWindow} />
      </div>
    );
  }
}

export default App;
