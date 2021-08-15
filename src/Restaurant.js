import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export class Restaurant extends Component {
  render() {
    return (
      <>
        <Card border='primary'>
          <Card.Img variant='top' src={this.props.image_url}></Card.Img>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Text>
            Yelp link:{' '}
            <a href={this.props.url} target='_blank' rel='noreferrer'>
              click here
            </a>
          </Card.Text>
          <Card.Text>reviews: {this.props.reviews}</Card.Text>
          {/* <Card.Text>categories: {this.props.categories}</Card.Text> */}
          <Card.Text>rating: {this.props.rating}</Card.Text>
          {/* <Card.Text>transaction: {this.props.transaction}</Card.Text> */}
          {/* <Card.Text>location: {this.props.location}</Card.Text> */}
          <Card.Text>phone: {this.props.phone}</Card.Text>
          <Card.Text>distance: {this.props.distance}</Card.Text>
        </Card>
      </>
    );
  }
}

export default Restaurant;
