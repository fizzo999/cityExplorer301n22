import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export class CityMap extends Component {
  render() {
    return (
      <>
        {this.props.hasSearched && this.props.mapDisplaying ? (
          <>
            <br />
            <img
              className='cityMapImage'
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.props.lat},${this.props.lon}&zoom=${this.props.zoomLevel}`}
              alt={`This should display ${this.props.city}`}
              title={this.props.city}
            />
            <br />
            <Button
              className='zoomButton'
              onClick={() => this.props.handleZoom(+1)}
            >
              <i className='bi bi-zoom-in'></i> Zoom in{' '}
            </Button>
            <Button
              className='zoomButton'
              onClick={() => this.props.handleZoom(-1)}
            >
              <i className='bi bi-zoom-out'></i> Zoom out{' '}
            </Button>
            <h3>current zoom level: {this.props.zoomLevel}</h3>
          </>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default CityMap;
