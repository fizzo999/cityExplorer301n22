import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export class Movie extends Component {
  render() {
    return (
      <>
        <Card border='primary'>
          <Card.Img variant='top' src={this.props.image_url}></Card.Img>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.overview}</Card.Text>
          <Card.Text>average votes: {this.props.average_votes}</Card.Text>
          <Card.Text>total votes: {this.props.total_votes}</Card.Text>
          <Card.Text>popularity: {this.props.popularity}</Card.Text>
          <Card.Text>release date: {this.props.release_date}</Card.Text>
        </Card>
      </>
    );
  }
}

export default Movie;
