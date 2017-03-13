import { createStore } from 'redux';
import getLocations from './Utils/getLocations';

const initialState = { 'locations': getLocations(), 'selectedCity': '' };

function getLocalState(state = initialState, action) {
    if (action.type === 'ADD_CITY') {
        if (state.locations.indexOf(action.payload) === -1)
            state.locations.push(action.payload);
    }
    else if (action.type === 'REMOVE_CITY') {
        if (state.locations.indexOf(action.payload) !== -1)
            state.locations.splice(state.locations.indexOf(action.payload), 1);
    }
    else if (action.type === 'SELECT_CITY') {
        state.selectedCity = action.payload;
    }
    localStorage.setItem('weatherapp_storage', JSON.stringify(state));
    return state;
}

const store = createStore(getLocalState, window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;