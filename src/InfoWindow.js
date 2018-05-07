import React, { Component } from 'react';
import Draggable from 'react-draggable';

class InfoWindow extends Component {
  render() {
    if (!this.props.place) return <div></div>
    else {
      const { place } = this.props;
      return (
      <Draggable>
        <div className='info-window'>
          <h2 className='info-name'>{place.name}</h2>
          <p className='info-category'>{place.categories[0].name}</p>
          <p className='info-address'>{place.location.address}, {place.location.city}</p>
        </div>
      </Draggable>
    );}
  }
}

export default InfoWindow;