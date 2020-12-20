// require("../styles/application.scss");
import { Provider } from 'react-redux'

import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable'
import 'regenerator-runtime/runtime';

import { RedditTV } from './RedditTV';
import './style.scss';

import { store } from './store'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <RedditTV />
  </Provider>, rootElement
);
