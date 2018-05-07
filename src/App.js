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
    const places = this.state.places.map((p, index) => {
      if (index === marker) {
        p.clicked = true;
      } else {
        p.clicked = false;
      }
      return p;
    });

    this.setState({
      places: places,
      selectedPlace: this.state.places[marker]
    });

    console.log(this.state.places[marker]);
  }

  hideInfoWindow = () => {
    const places = this.state.places.map((p, index) => {
      p.clicked = false;
      return p;
    });

    this.setState({ places: places, selectedPlace: null });
  }

  render() {
    console.log(this.state);
    return (
      <div className='app-container'>
        <List
          setMarkers={this.setMarkers} />
        <Map
          places={this.state.places.map(v => {
            return { lat: v.location.lat, lng: v.location.lng, clicked: v.clicked }
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
