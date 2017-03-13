import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WeatherView.css';
import store from '../localStore';

class WeatherView extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedCity: '' };
        store.subscribe(this.handleChange.bind(this));
    } 
    handleChange() {
        this.setSelectedCity(this.props.localState.selectedCity);
    }
    setSelectedCity(city) {
        this.setState({ selectedCity: city });
    }
    render() {
        return (
            <div className="Weather-view" >weather in {this.state.selectedCity} view will be here soon</div>
        )
    };
}

export default connect(
    state => ({
        localState: state
    })
)(WeatherView);