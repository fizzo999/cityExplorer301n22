import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Weather from './Weather.js';

export class WeatherComponent extends Component {
  render() {
    let weatherComponentArray = [];
    if (this.props.weatherResultsArray.length > 0) {
      weatherComponentArray = this.props.weatherResultsArray.map(
        (eachForecast, index) => {
          return (
            <Weather
              key={index}
              description={eachForecast.description}
              low={eachForecast.low}
              high={eachForecast.high}
              date={eachForecast.date}
              icon={eachForecast.icon}
            />
          );
        }
      );
    }
    return (
      <>
        {this.props.weatherResultsArray.length !== 0 &&
        this.props.weatherDisplaying === true ? (
          <Container className='weatherDiv'>
            {/* <CarouselComponent></CarouselComponent> */}
            <CardColumns>{weatherComponentArray}</CardColumns>
          </Container>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default WeatherComponent;
