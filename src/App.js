import React from 'react';
import './App.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
// import CardColumns from 'react-bootstrap/CardColumns';

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
      zoomLevel: 12,
      weatherResultsArray: [],
      lat: 0,
      lon: 0,
    };
  }

  handleChange = e => {
    this.setState({
      city: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.state.city) {
      this.setState({
        hasSearched: false,
        hasError: true,
        errorMessage: 'Please typa a valid city name',
        status: 400,
      });
      return;
    }
    try {
      let API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`;
      let cityResults = await axios.get(API);
      // console.log('here is api ', API);
      console.log('cityResults ', cityResults);
      this.setState({
        hasSearched: true,
        citySearchResult: cityResults.data[0],
        status: cityResults.status,
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        hasError: false,
      });
      this.getWeather();
    } catch (error) {
      console.log(
        'here is your error message =======>>>>>>>>',
        error.response.data.error
      );
      this.setState({
        hasSearched: false,
        hasError: true,
        errorMessage: error.response.data.error,
        status: error.response.status,
      });
    }
  };

  getWeather = async () => {
    try {
      let API2 = `http://localhost:3001/weather?city=${this.state.city}`;
      let weatherResults = await axios.get(API2);
      // console.log('here is api2 ', API2);
      // console.log('weatherResults', weatherResults);
      this.setState({
        hasError: false,
        weatherResultsArray: weatherResults.data,
      });
    } catch (error) {
      console.log('here is your error message =======>>>>>>>>', error);
      this.setState({
        hasSearched: false,
        hasError: true,
        errorMessage: error.response.data,
        status: error.response.status,
      });
      console.log('here is your error <<<<<<<<=======>>>>>>>>', error.response);
    }
  };
  handleZoomIn = () => {
    this.setState({
      zoomLevel: this.state.zoomLevel + 1,
    });
  };
  handleZoomOut = () => {
    this.setState({
      zoomLevel: this.state.zoomLevel - 1,
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
            <em className='red'>{this.state.city}</em>
          </h3>
        ) : (
          ''
        )}
        {this.state.hasSearched ? (
          <h3>
            ok and here is your LAT: <em className='red'> {this.state.lat}</em>{' '}
            and your LONG:
            <em className='red'> {this.state.lon}</em>
          </h3>
        ) : (
          ''
        )}
        {this.state.hasSearched ? (
          <>
            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoomLevel}`}
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
          <>
            <h2 className='red'> error status code: {this.state.status}</h2>
            <h2 className='red'> error message: {this.state.errorMessage}</h2>
          </>
        ) : (
          ''
        )}

        {this.state.weatherResultsArray.length !== 0 &&
        this.state.hasSearched === true ? (
          <Container className='forecast'>
            {' '}
            {this.state.weatherResultsArray.map((eachForecast, index) => {
              return (
                <React.Fragment>
                  <Card
                    key={index}
                    border='primary'
                    style={{
                      width: '300px',
                      padding: '32px',
                      margin: '24px',
                    }}
                    className={
                      eachForecast.description.includes('Sky')
                        ? 'blue'
                        : eachForecast.description.includes('rain')
                        ? 'rain'
                        : 'clouds'
                    }
                  >
                    <Card.Title>date: {eachForecast.date}</Card.Title>
                    <Card.Text>{eachForecast.description}</Card.Text>
                  </Card>
                </React.Fragment>
              );
            })}
          </Container>
        ) : (
          ''
        )}
      </Container>
    );
  }
}

export default App;
