import React from 'react';
import './App.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      hasSearched: false,
      hasError: false,
      errorMessage: '',
      citySearchResult: {},
      status: 0,
      imageSource: '',
      zoomLevel: 12,
      weatherResultsArray: [],
    };
  }

  handleChange = e => {
    this.setState({
      city: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      let API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`;
      let cityResults = await axios.get(API);
      console.log('here is api ', API);
      console.log('cityResults ', cityResults);
      this.setState({
        hasSearched: true,
        citySearchResult: cityResults.data[0],
        status: cityResults.status,
        imageSource: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${cityResults.data[0].lat},${cityResults.data[0].lon}&zoom=12`,
        hasError: false,
      });
    } catch (error) {
      console.log(
        'here is your error message =======>>>>>>>>',
        error.response.data.error
      );
      this.setState({
        hasSearched: true,
        hasError: true,
        errorMessage: error.response.data.error,
        status: error.response.status,
      });
    }
    try {
      let API2 = `http://172.27.47.36:3001/weather?city=${this.state.city}`;
      let weatherResults = await axios.get(API2);
      console.log('here is api2 ', API2);
      console.log('weatherResults', weatherResults);
      this.setState({
        hasError: false,
        weatherResultsArray: weatherResults.data,
      });
    } catch (error) {
      console.log('here is your error message =======>>>>>>>>', error.response);
      this.setState({
        hasError: true,
        errorMessage: error.response.data.error,
        status: error.response.status,
      });
    }
  };
  handleZoomIn = () => {
    this.setState({
      zoomLevel: this.state.zoomLevel + 1,
      imageSource: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.citySearchResult.lat},${this.state.citySearchResult.lon}&zoom=${this.state.zoomLevel}`,
    });
  };
  handleZoomOut = () => {
    this.setState({
      zoomLevel: this.state.zoomLevel - 1,
      imageSource: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.citySearchResult.lat},${this.state.citySearchResult.lon}&zoom=${this.state.zoomLevel}`,
    });
  };

  render() {
    console.log('here is your error', this.state.errorMessage);
    console.log(
      'here is your weatherResultsArray',
      this.state.weatherResultsArray
    );
    return (
      <Container>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          Please enter a city name
          <br />
          <input onChange={this.handleChange}></input>
          <br />
          <button>EXPLORE !!!</button>
        </form>
        {this.state.hasSearched ? (
          <h3>
            here is information about the city you searched:{' '}
            <em style={{ color: 'red' }}>{this.state.city}</em>
          </h3>
        ) : (
          ''
        )}
        {this.state.hasSearched ? (
          <h3>
            ok and here is your LAT:{' '}
            <em style={{ color: 'red' }}> {this.state.citySearchResult.lat}</em>{' '}
            and your LONG:
            <em style={{ color: 'red' }}> {this.state.citySearchResult.lon}</em>
          </h3>
        ) : (
          ''
        )}
        {this.state.hasSearched ? (
          <>
            <img
              src={this.state.imageSource}
              alt={`This should display ${this.state.city}`}
              title={this.state.city}
            />
            <br />
            <button onClick={this.handleZoomIn}> Zoom in </button>
            <button onClick={this.handleZoomOut}> Zoom out </button>
            <h3>{this.state.zoomLevel}</h3>
          </>
        ) : (
          ''
        )}
        {this.state.hasError ? (
          <h2 style={{ color: 'red' }}>
            {' '}
            error status code: {this.state.status}
          </h2>
        ) : (
          ''
        )}
        {this.state.weatherResultsArray.length !== 0
          ? this.state.weatherResultsArray.map((eachForecast, index) => {
              return (
                <h3 key={index}>
                  date: {eachForecast.date}, description:{' '}
                  {eachForecast.description}
                </h3>
              );
            })
          : ''}
      </Container>
    );
  }
}

export default App;
