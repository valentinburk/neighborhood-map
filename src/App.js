import React, { Component } from 'react';
import List from './List';
import Map from './Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <Map />
      </div>
    );
  }
}

export default App;
