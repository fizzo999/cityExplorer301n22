import React from 'react';
import './App.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Weather from './Weather.js';
import Movie from './Movie.js';
// import CarouselComponent from './Carousel.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      hasSearched: false,
      hasError: false,
      errorMessage: '',
      citySearchResult: {},
      lat: 0,
      lon: 0,
      status: 0,
      zoomLevel: 12,
      mapDisplaying: false,
      weatherDisplaying: false,
      weatherResultsArray: [],
      moviesDisplaying: false,
      moviesResultsArray: [],
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
      this.setState({
        hasSearched: true,
        mapDisplaying: true,
        citySearchResult: cityResults.data[0],
        status: cityResults.status,
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        hasError: false,
      });
      this.getWeather();
      this.getMovies();
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
      let API2 = `${process.env.REACT_APP_BACKEND_SERVER}/weather?lat=${this.state.lat}&lon=${this.state.lon}`;
      let weatherResults = await axios.get(API2);
      this.setState({
        hasError: false,
        weatherResultsArray: weatherResults.data,
        status: weatherResults.status,
      });
    } catch (error) {
      console.log('here is your error message =======>>>>>>>>', error);
      this.setState({
        hasSearched: false,
        hasError: true,
        errorMessage: error.response.data ? error.response.data : error,
        status: error.response.status ? error.response.status : error,
      });
    }
  };
  getMovies = async () => {
    try {
      let API3 = `${process.env.REACT_APP_BACKEND_SERVER}/movies?city=${this.state.city}`;
      let movieArray = await axios.get(API3);
      this.setState({
        hasError: false,
        moviesResultsArray: movieArray.data,
        status: movieArray.status,
      });
    } catch (error) {
      console.log(
        'here is your error message for Movies =======>>>>>>>>',
        error
      );
      this.setState({
        hasSearched: false,
        hasError: true,
        errorMessage: error.response.data ? error.response.data : error,
        status: error.response.status ? error.response.status : error,
      });
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

  changeDisplay = whichDisplay => {
    this.setState({
      [whichDisplay]: !this.state[whichDisplay],
    });
  };

  render() {
    let weatherComponentArray = [];
    if (this.state.weatherResultsArray.length > 0) {
      weatherComponentArray = this.state.weatherResultsArray.map(
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
    let moviesComponentArray = [];
    if (this.state.moviesResultsArray.length > 0) {
      moviesComponentArray = this.state.moviesResultsArray.map(
        (movie, index) => {
          return (
            <Movie
              key={index}
              title={movie.title}
              overview={movie.overview}
              average_votes={movie.average_votes}
              total_votes={movie.total_votes}
              image_url={movie.image_url}
              popularity={movie.popularity}
              released_on={movie.released_on}
            />
          );
        }
      );
    }

    return (
      <Container>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          Please enter a city name
          <br />
          <input onChange={this.handleChange}></input>
          <br />
          <Button type='submit' className='exploreButton'>
            <i class='bi bi-search'></i>EXPLORE !!!
          </Button>
        </form>
        {this.state.hasSearched ? (
          <>
            <h3>
              CITY: <em className='red'>{this.state.city}</em> LAT:{' '}
              <em className='red'> {this.state.lat}</em> LONG:{' '}
              <em className='red'> {this.state.lon}</em>
            </h3>
          </>
        ) : (
          ''
        )}
        {this.state.hasSearched ? (
          <>
            <Button
              className='stateChangerButton'
              onClick={() => this.changeDisplay('mapDisplaying')}
            >
              <i class='bi bi-map-fill'></i>
              {this.state.mapDisplaying ? 'Hide' : 'Show'} map
            </Button>
            <Button
              className='stateChangerButton'
              onClick={() => this.changeDisplay('moviesDisplaying')}
            >
              <i className='bi-film'></i>
              {this.state.moviesDisplaying ? 'Hide' : 'Show'} movies
            </Button>
            <Button
              className='stateChangerButton'
              onClick={() => this.changeDisplay('weatherDisplaying')}
            >
              <i class='bi bi-cloud-sun-fill'></i>
              {this.state.weatherDisplaying ? 'Hide' : 'Show'} weather
            </Button>
          </>
        ) : (
          ''
        )}
        {this.state.hasSearched && this.state.mapDisplaying ? (
          <>
            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoomLevel}`}
              alt={`This should display ${this.state.city}`}
              title={this.state.city}
            />
            <br />
            <Button className='zoomButton' onClick={this.handleZoomIn}>
              <i class='bi bi-zoom-in'></i> Zoom in{' '}
            </Button>
            <Button className='zoomButton' onClick={this.handleZoomOut}>
              <i class='bi bi-zoom-out'></i> Zoom out{' '}
            </Button>
            <h3>current zoom level: {this.state.zoomLevel}</h3>
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
        this.state.weatherDisplaying === true ? (
          <Container className='weatherDiv'>
            {/* <CarouselComponent></CarouselComponent> */}
            <CardColumns>{weatherComponentArray}</CardColumns>
          </Container>
        ) : (
          ''
        )}
        {this.state.moviesResultsArray.length !== 0 &&
        this.state.moviesDisplaying === true ? (
          <Container className='moviesDiv'>
            <CardColumns>{moviesComponentArray}</CardColumns>
          </Container>
        ) : (
          ''
        )}
      </Container>
    );
  }
}

export default App;
