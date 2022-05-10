# Project Name: City Explorer 301n22

**Author**: ✨Fizzo Pannosch✨
**Version**: 3.0.0

## Deployed site @ https://fizzo-city-explorer.netlify.app/

## Overview - Problem domain:

as a user,
I want to enter a city name
and receive information about a city, specifically

- a map,
- a weather forecast for the next 16 days,
- movies that are about the city,
- and restaurants in that city

This is a Code Fellows 301 project to train students to make a frontend react app that allows a user to enter a city name into a form and upon submit to receive and display information about a city.

That city name gets sent to my own backend server that is deployed on heroku that makes a call out to the locationIQ API to bring back latitude and longitude precise information that allows the react app to render a map of the city. Then the lat and lon information gets sent to the weatherbit.io API for forecast data about the next 16 days. It also gets sent to the movieDB.org API for movie information searched with the keyword of entered city. And it gets sent to Yelp for restaurant data in the searched city

This App connects to a server https://fizzo-city-explorer-server.herokuapp.com/city-explorer that I built that allows the following routes:

- / - home route for testing resulting in a greeting message - proof of life
- /location?city=Seattle - a location route to call out to locationIQ and then serve back the lat and long for a city
- /weather?lat=47.6038321&lon=-122.3300624 - a weather route to get 16day forcast for a city
- /movies?city=Seattle - a movies route to get movie info(title, release date, movie poster, description) about a city
- /restaurants?city=Seattle - a reestaurant route to get restaurant info (name, phone number, yelp link, photo, rating) about a city

<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

## Getting Started

```
git clone https://github.com/fizzo999/cityExplorer301n22.git
```

in order to clone this repo to your local machine.
Create a .env file with one important variable:

```
REACT_APP_BACKEND_SERVER=https://fizzo-city-explorer-server.herokuapp.com
```

and store that in your .env file. Be careful with the naming convention. Since this variable is used in the code it has to match in order to work

<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture

React app built on Node.js
using create-react app
using axios for API calls to my own deployed server
bootstrap@4.6.0 and react-bootstrap for quick and easy styling

<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log

<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example: -->

08-08-2021 3:23pm - Application now has a fully-functional react frontend that calls (GET requests) my own deployed public facing server to get city info and display it in a visually pleasing way.

## Credit and Collaborations

big shoutout to Ryan Gallaway - Code Fellows teacher for 301n22 class for a great lecture for lab07 to walk students through creating a server.

big shoutout to Willem Jacobs - got the idea of icons for weather from weatherbit.io from him. Also the use of react-bootstrap icons - and the idea of having a button to show or hide results (I had done that in the 201 project of busmall to show/hide the results of the visual product survey and I like it);

<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
