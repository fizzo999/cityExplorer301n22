import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export class CityResult extends Component {
  render() {
    return (
      <>
        {this.props.hasSearched ? (
          <>
            <h3>
              CITY: <em className='red'>{this.props.city}</em> LAT:{' '}
              <em className='red'> {this.props.lat}</em> LONG:{' '}
              <em className='red'> {this.props.lon}</em>
            </h3>
          </>
        ) : (
          ''
        )}
        {this.props.hasSearched ? (
          <>
            <Button
              className='stateChangerButton'
              onClick={() => this.props.changeDisplay('mapDisplaying')}
            >
              <i className='bi bi-map-fill'></i>
              {this.props.mapDisplaying ? 'Hide' : 'Show'} map
            </Button>
            <Button
              className='stateChangerButton'
              onClick={() => this.props.changeDisplay('moviesDisplaying')}
            >
              <i className='bi-film'></i>
              {this.props.moviesDisplaying ? 'Hide' : 'Show'} movies
            </Button>
            <Button
              className='stateChangerButton'
              onClick={() => this.props.changeDisplay('weatherDisplaying')}
            >
              <i className='bi bi-cloud-sun-fill'></i>
              {this.props.weatherDisplaying ? 'Hide' : 'Show'} weather
            </Button>
            <Button
              className='stateChangerButton'
              onClick={() => this.props.changeDisplay('restaurantsDisplaying')}
            >
              <i className='bi bi-cup-straw'></i>
              {this.props.restaurantsDisplaying ? 'Hide' : 'Show'} restaurants
            </Button>
          </>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default CityResult;
