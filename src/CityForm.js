import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export class CityForm extends Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.handleSubmit}>
          Please enter a city name
          <br />
          <input onChange={e => this.props.handleChange(e)}></input>
          <br />
          <Button type='submit' className='exploreButton'>
            <i class='bi bi-search'></i>EXPLORE !!!
          </Button>
        </form>
      </>
    );
  }
}

export default CityForm;
