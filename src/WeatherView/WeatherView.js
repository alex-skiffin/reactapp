import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WeatherView.css';

class WeatherView extends Component {
    render() {
        return (
            <div className="Weather-view" >weather view will be here soon</div>
        )
    };
}

export default connect(
    state => ({
        cityStore: state
    }),
    dispatch => ({})
)(WeatherView);