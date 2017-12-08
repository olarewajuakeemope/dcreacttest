import React, { Component } from 'react';
import { Link } from 'react-router';
import '../res/styles/weather.css';
import weatherStore from '../stores/weatherStore';

class SunDetails extends Component {
  state = {
    date: '',
    riseDate: '',
    setDate: '',
  }

  componentWillMount() {
    const details = weatherStore.getWeather();
    const { sys, dt } = details;
    if (sys && dt) {
      this.setState({
        date: this.formatDate(dt),
        riseDate: this.formatDate(sys.sunrise),
        setDate: this.formatDate(sys.sunset),
      });
    }
  }

  formatDate = date => ((new Date(date * 1000)).toString().substring(0, 25))

  render() {
    const {
      date,
      riseDate,
      setDate,
    } = this.state;
    return (
      <div>
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link to="weather">Weather</Link>
          <Link className="active" to="sundetails">Sunrise/set</Link>
        </div>

        <div className="content container">
          <div className="row">
            <h3>Sunrise/set Details</h3>
          </div>
          <div className="column">
            <p>Date/Time: {date}</p>
            <p>Sunrise: {riseDate}</p>
            <p>Sunset: {setDate}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SunDetails;
