import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export class Weather extends Component {
  render() {
    return (
      <>
        <Card
          border='primary'
          className={
            this.props.description.includes('Sky')
              ? 'sky'
              : this.props.description.includes('rain')
              ? 'rain'
              : 'clouds'
          }
        >
          <Card.Title>{this.props.dayOfTheWeek}</Card.Title>
          <Card.Text>{this.props.date}</Card.Text>
          <Card.Text className='weatherDescription'>
            {this.props.description}
          </Card.Text>
          <Card.Img
            variant='top'
            src={`./weather_icons/${this.props.icon}.png`}
          />
          <Card.Text>high: {this.props.high}</Card.Text>
          <Card.Text>low: {this.props.low}</Card.Text>
        </Card>
      </>
    );
  }
}

export default Weather;
