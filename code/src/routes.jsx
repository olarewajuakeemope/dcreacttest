import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/Home';
import App from './components/App';
import Weather from './components/Weather';
import SunDetails from './components/SunDetails';


export default (

  <Route path="/" component={Home} >
    <IndexRoute component={App} />
    <Route path="/weather" component={Weather} />
    <Route path="/sundetails" component={SunDetails} />
  </Route>
);
