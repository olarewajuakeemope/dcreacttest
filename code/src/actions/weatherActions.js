import axios from 'axios';
import dotenv from 'dotenv';
import dispatcher from '../dispatcher/dispatcher';

dotenv.config();


const API_KEY = process.env.REACT_APP_API_KEY;
const ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

/**
 * Broadcasts an Action when a fresh Weather details has been
 * successfully retrieved. The retrieved Weather and other metadata
 * are part of the Action's payload.
 * @param {HTTPResponse} response - An Object that contains the retrieved
 * Weather and other metadata about the retrieval.
 */
export function WeatherFetched(response) {
  const data = response.data;
  dispatcher.dispatch({
    type: 'WEATHER_FETCHED',
    data,
  });
}

/**
 * Broadcasts an Action that fetching fresh Weather detail has started. Then,
 * it calls [WeatherFetched()]{@link WeatherFetched}
 * @param {String} city - The city name of the weather details desired e.g London,
 * Lagos etc.
 * @param {String} metric - The unit type of the Weather details to retrieve e.g Imperial,
 * Metric etc.
 */
export function fetchWeather(city, metric) {
  const url = `${ROOT_URL}&q=${city}&units=${metric}`;
  axios.get(url)
    .then(request => (WeatherFetched(request)));
}
