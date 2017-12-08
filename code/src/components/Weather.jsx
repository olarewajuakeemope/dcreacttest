import React, { Component } from 'react';
import { Link } from 'react-router';
import '../res/styles/weather.css';
import weatherStore from '../stores/weatherStore';

class Weather extends Component {
  state = {
    date: '',
    temp: '',
    speed: '',
    description: '',
  }

  componentWillMount() {
    const details = weatherStore.getWeather();
    const { weather, main, wind, dt } = details;
    if (weather && main && wind && dt) {
      this.setState({
        date: (new Date(dt * 1000)).toString().substring(0, 24),
        temp: main.temp,
        speed: wind.speed,
        description: weather[0].description,
      });
    }
  }

  render() {
    const {
      date,
      temp,
      speed,
      description,
    } = this.state;
    return (
      <div>
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link className="active" to="weather">Weather</Link>
          <Link to="sundetails">Sunrise/set</Link>
        </div>

        <div className="container content">
          <div className="row">
            <h3>Weather Details</h3>
          </div>
          <div className="column">
            <p>Date/Time: {date}</p>
            <p>Temperature: {temp}</p>
            <p>Wind Speed: {speed}</p>
            <p>Weather Description: {description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
