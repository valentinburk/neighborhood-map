import React, { Component } from 'react';
import Geocode from 'react-geocode';
import escapeRegExp from 'escape-string-regexp';

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
        this.props.foursquare.venues.getVenues({
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

  handleSandwichClick = () => {
    const map = document.querySelector('.map-container');
    map.style.marginLeft = map.style.marginLeft === '250px' ? '0' : '250px';

    const sandwich = document.querySelector('.sandwich');
    sandwich.style.left = sandwich.style.left === '250px' ? '0' : '250px';
  }

  render() {
    const { query } = this.state;

    let filteredPlaces = this.getFilteredPlaces();

    return (
      <div>
        <div className='sidebar'>
          <div className='heading'>
            <h1 className='title'>
              Places
            </h1>
            <input
              className='filter-places'
              type='text'
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
              placeholder='Filter places' />
          </div>
          <div className='place-list'>
            <ol className='places'>
              {filteredPlaces.map((p, index) =>
                <li
                  key={index}
                  className='place'
                  onClick={() => {this.props.onPlaceClick(index)}}>
                    {p.name}
                </li>
              )}
            </ol>
          </div>
        </div>
        <p
          style={{left: '250px'}}
          className='sandwich'
          onClick={this.handleSandwichClick}>
          <img
            src='menu.png'
            alt='Toggle menu' />
        </p>
      </div>
    );
  }
}

export default List;