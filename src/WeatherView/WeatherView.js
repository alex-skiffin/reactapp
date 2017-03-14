import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WeatherView.css';
import store from '../localStore';

class WeatherView extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedCity: '', weatherJson: '' };
        store.subscribe(this.handleChange.bind(this));
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    }
    showPosition(position) {
        this.setState({ selectedCity: position.coords.latitude + '  ' + position.coords.longitude });
        let myRequest = new Request('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=feb41e28004c532f9bb0ae9e5affc08a');
        this.getSelectedCityWeather(myRequest);
    }
    handleChange() {
        this.setState({ selectedCity: this.props.localState.selectedCity });
        let req = new Request('http://api.openweathermap.org/data/2.5/weather?q=' + this.props.localState.selectedCity + '&APPID=feb41e28004c532f9bb0ae9e5affc08a');
        this.getSelectedCityWeather(req);
    }
    getSelectedCityWeather(request) {
        let req = fetch(request)
            .then(function (response) {
                if (response.status === 200)
                    return response.json();
            })
            .catch(function (error) {
                console.error(error);
            });
        req.then((bd) => {
            this.setState({ weatherJson: JSON.stringify(bd) });
        });
    }
    render() {
        return (
            <div>
                <div className="Weather-view" >weather in {this.state.selectedCity} view will be here soon</div>
                <div>{this.state.weatherJson}</div>
            </div>
        )
    };
}

export default connect(
    state => ({
        localState: state
    })
)(WeatherView);