import React, { Component } from 'react';
import CityList from './CityList/CityList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>init page</h2>
        </div>
        <div className="cities">
          <CityList />
        </div>
      </div>
    );
  }
}
export default App;
