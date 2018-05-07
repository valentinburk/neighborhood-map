import React, { Component } from 'react';
import Geocode from 'react-geocode';
import escapeRegExp from 'escape-string-regexp';

const Foursquare = require('react-foursquare')({
  clientID: 'DF30QCC2OFQ3EO5L2JYYYZODPV0A4MIDY10HPD0HEI20MOHB',
  clientSecret: 'SAITGGNJVSYI5NTYUCP4P5EDH03L0BENSGIW2LVCE13YUQKL'
});

Geocode.setApiKey('AIzaSyC2eiZsx2oT_y03EA5ksk4zLCFq0mifCVM');

class List extends Component {
  state = {
    places: [],
    query: ''
  }

  componentDidMount() {
    Geocode.fromAddress("Googleplex").then(
      geoResponse => {
        const { lat, lng } = geoResponse.results[0].geometry.location;
        Foursquare.venues.getVenues({
          'll': `${lat},${lng}`,
          'categoryId': '4d4b7104d754a06370d81259'
        }).then(fsResponse => {
          const venues = fsResponse.response.venues;
          this.props.setMarkers(venues);
          this.setState({ places: venues });
        });
      }
    );
  }

  updateQuery = (query) => {
    this.setState({ query }, () => {
      const filtered = this.getFilteredPlaces();
      this.props.setMarkers(filtered);
    });
  }

  getFilteredPlaces() {
    const { query, places } = this.state;

    if (!query) {
      return places;
    }

    const match = new RegExp(escapeRegExp(query), 'i');
    return places.filter(p => match.test(p.name));
  }

  render() {
    const { query, places } = this.state;

    let filteredPlaces = this.getFilteredPlaces();

    return (
      <div className='place-list'>
        <h1 className='title'>
          Palo Alto
        </h1>
        <input
          className='filter-places'
          type='text'
          value={query}
          onChange={event => this.updateQuery(event.target.value)}
          placeholder='Filter places' />
        <ol className='places'>
          {filteredPlaces.map((p, index) =>
            <li
              key={index}
              className='place'>
                {p.name}
            </li>
          )}
        </ol>
      </div>
    );
  }
}

export default List;