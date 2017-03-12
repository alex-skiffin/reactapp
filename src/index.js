import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getLocations from './Utils/getLocations';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = getLocations();

function cityList(state = initialState, action) {
  if (action.type === 'ADD_CITY') {
    if (state.indexOf(action.payload) === -1)
      state.push(action.payload);
  }
  else if (action.type === 'REMOVE_CITY') {
    if (state.indexOf(action.payload) !== -1)
      state.splice(state.indexOf(action.payload), 1);
  }
  localStorage.setItem('locations', JSON.stringify(state));
  return state;
}

const store = createStore(cityList, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
