import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Movie from './Movie.js';

export class MoviesComponent extends Component {
  render() {
    let moviesComponentArray = [];
    if (this.props.moviesResultsArray.length > 0) {
      moviesComponentArray = this.props.moviesResultsArray.map(
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
      <>
        {this.props.moviesResultsArray.length !== 0 &&
        this.props.moviesDisplaying === true ? (
          <Container className='moviesDiv'>
            <CardColumns>{moviesComponentArray}</CardColumns>
          </Container>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default MoviesComponent;
