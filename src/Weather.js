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
              ? 'blue'
              : this.props.description.includes('rain')
              ? 'rain'
              : 'clouds'
          }
        >
          <Card.Title>date: {this.props.date}</Card.Title>
          <Card.Img
            variant='top'
            src={`./weather_icons/${this.props.icon}.png`}
          />
          <Card.Text>{this.props.description}</Card.Text>
        </Card>
      </>
    );
  }
}

export default Weather;
