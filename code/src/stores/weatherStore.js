import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';

/**
 * This Store contains the weather data that has been retrieved.
 * @extends EventEmitter
 */
class WeatherStore extends EventEmitter {
  /**
   * Initializes this Store with various properties, most especially the
   * list of new Weather data currently available.
   * @constructor
   */
  constructor() {
    super();
    this.Weather = {};
  }

  /**
   * Reacts to any Action that's of interest, most especially one for when
   * a new Weather data has been retrieved.
   * @param {Action} action - A new Action, containing the ActionType and
   * other data.
   * @return {void}
   */
  handleAction(action) {
    if (action.type === 'WEATHER_FETCHED') {
      // const Weather = action.data.Weather.map(article => ({
      //   title: article.title,
      //   description: article.description,
      //   url: article.url,
      //   imageUrl: article.urlToImage,
      //   author: article.author,
      //   publishedAt: article.publishedAt,
      // }));
      this.Weather = action.data;
      this.emit('weatherFetched');
    }
  }

  /**
   * @return {Object} Weather - An object that represent each data retrieved.
   */
  getWeather() {
    return this.Weather;
  }
}

const weatherStore = new WeatherStore();
dispatcher.register(weatherStore.handleAction.bind(weatherStore));

export default weatherStore;
