import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Restaurant from './Restaurant.js';

export class RestaurantsComponent extends Component {
  render() {
    let restaurantsComponentArray = [];
    if (this.props.restaurantsResultsArray.length > 0) {
      restaurantsComponentArray = this.props.restaurantsResultsArray.map(
        (eachRestaurant, index) => {
          return (
            <Restaurant
              key={index}
              name={eachRestaurant.name}
              image_url={eachRestaurant.image_url}
              url={eachRestaurant.url}
              reviews={eachRestaurant.reviews}
              categories={eachRestaurant.categories}
              rating={eachRestaurant.rating}
              transactions={eachRestaurant.transactions}
              location={eachRestaurant.location}
              phone={eachRestaurant.phone}
              distance={eachRestaurant.distance}
            />
          );
        }
      );
    }
    return (
      <>
        {this.props.restaurantsResultsArray.length !== 0 &&
        this.props.restaurantsDisplaying === true ? (
          <Container className='restaurantsDiv'>
            <CardColumns>{restaurantsComponentArray}</CardColumns>
          </Container>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default RestaurantsComponent;
