import React, { Component } from 'react';
import Draggable from 'react-draggable';

class InfoWindow extends Component {
  render() {
    const { place } = this.props;

    if (!place) {
      return <div></div>
    } else {
      console.log(place);
      return (
      <Draggable>
        <div className='info-window'>
          <h2 className='info-name'>{place.name}</h2>
          <p className='info-category'>{place.categories[0].name}</p>
          <p className='info-address'>{place.location.address}, {place.location.city}</p>
          <p className='info-rating'>Rating: {place.rating} ({place.likes.summary})</p>
          {place.bestPhoto && (
            <img
              src={`${place.bestPhoto.prefix}300x200${place.bestPhoto.suffix}`}
              onDragStart={event => event.preventDefault()}></img>
          )}
        </div>
      </Draggable>
      )
    }
  }
}

export default InfoWindow;