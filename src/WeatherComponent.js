import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
// import CardColumns from 'react-bootstrap/CardColumns';
import Weather from './Weather.js';

export class WeatherComponent extends Component {
  weekdayArray = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  render() {
    let weatherComponentArray = [];
    if (this.props.weatherResultsArray.length > 0) {
      weatherComponentArray = this.props.weatherResultsArray.map(
        (eachForecast, index) => {
          let theNewDayInsideOfMap = new Date().toLocaleString('en-us', {
            weekday: 'long',
          });
          let indexForWeekDay = this.weekdayArray.indexOf(theNewDayInsideOfMap);
          if (indexForWeekDay + index > 6) {
            indexForWeekDay = (indexForWeekDay + index) % 7;
          } else {
            indexForWeekDay = indexForWeekDay + index;
          }
          return (
            <Weather
              key={index}
              description={eachForecast.description}
              low={eachForecast.low}
              high={eachForecast.high}
              date={eachForecast.date}
              icon={eachForecast.icon}
              dayOfTheWeek={this.weekdayArray[indexForWeekDay]}
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
            {weatherComponentArray}
          </Container>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default WeatherComponent;
