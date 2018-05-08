import React, { Component } from 'react';
import Draggable from 'react-draggable';

/**
 * Draggable modal window with place details info
 */
class InfoWindow extends Component {
  render() {
    const { place } = this.props;

    return (
    <Draggable>
      <article className='info-window' role='article' tabIndex='1'>
        <h2 className='info-name'>{place.name}</h2>
        <p
          onClick={() => {this.props.hideInfoWindow()}}
          className='close-window'>X</p>
        <p className='info-category'>{place.categories[0].name}</p>
        <p className='info-address'>{place.location.address}, {place.location.city}</p>
        <p className='info-rating'>Rating: {place.rating} ({place.likes.summary})</p>
        {place.bestPhoto && (
          <img
            arial-label={place.name}
            alt={place.name}
            src={`${place.bestPhoto.prefix}300x200${place.bestPhoto.suffix}`}
            onDragStart={event => event.preventDefault()}></img>
        )}
        <p className='attribution'>
          Data provided by <a target='_blank' href='https://foursquare.com'>Foursquare</a>
        </p>
      </article>
    </Draggable>
    )
  }
}

export default InfoWindow;