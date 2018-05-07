import React, { Component } from 'react';
import List from './List';
import Map from './Map';
import InfoWindow from './InfoWindow';
import './App.css';

class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }

  setMarkers = (places) => {
    this.setState({ places });
  }

  onMarkerClick = (marker) => {
    this.setState({ selectedPlace: this.state.places[marker] });
    console.log(this.state.places[marker]);
  }

  hideInfoWindow = () => {
    this.setState({ selectedPlace: null });
  }

  render() {
    return (
      <div className='app-container'>
        <List
          setMarkers={this.setMarkers} />
        <Map
          places={this.state.places.map(v => {
            return { lat: v.location.lat, lng: v.location.lng }
          })}
          hideInfoWindow={this.hideInfoWindow}
          onMarkerClick={this.onMarkerClick} />
        <InfoWindow
          place={this.state.selectedPlace}/>
      </div>
    );
  }
}

export default App;
