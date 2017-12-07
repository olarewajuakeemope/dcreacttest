import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import '../res/styles/App.css';
import * as weatherActions from '../actions/weatherActions';
import weatherStore from '../stores/weatherStore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      select: 0,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  /**
   * Contains callbacks that update this Component whenever a Store it
   * depends on changes.
   */
  componentWillMount() {
    weatherStore.on('weatherFetched', () => {
      this.setState({ term: '', select: 0 });
      browserHistory.push('weather');
    });
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    const { term, select } = this.state;
    event.preventDefault();
    if (term && select) {
      weatherActions.fetchWeather(term, select);
    }
  }

  handleSelect(event) {
    this.setState({
      select: event.target.value,
    });
  }

  render() {
    const { term, select } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weather Statistics</h1>
          <div className="container">
            <div className="row">
              <div className="offset-sm-3 col-sm-6">
                <h5 className="form-label">Please select a unit and enter city name</h5>
                <form onSubmit={this.onFormSubmit} className="input-group">
                  <span className="input-group-btn">
                    <select
                      className="form-control"
                      onChange={this.handleSelect}
                      value={select}
                    >
                      <option value={0} disabled>Unit</option>
                      <option value="Metric">Metric</option>
                      <option value="Imperial">Imperial</option>
                    </select>
                  </span>
                  <input
                    placeholder="Enter city name"
                    className="form-control"
                    value={term}
                    onChange={this.onInputChange}
                  />

                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
