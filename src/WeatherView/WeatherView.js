import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WeatherView.css';
import store from '../localStore';

class WeatherView extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedCity: '', weatherJson: '' };
        store.subscribe(this.handleChange.bind(this));
    }
    handleChange() {
        this.setSelectedCity(this.props.localState.selectedCity);
    }
    setSelectedCity(city) {
        this.setState({ selectedCity: city });
        let myRequest = new Request('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=');
        let req = fetch(myRequest)
            .then(function (response) {
                if (response.status === 200)
                    return response.json();//this.setState({ weatherJson: response.json() });
            })
            .catch(function (error) {
                console.error(error);
            });
        req.then((bd) => {
            this.setState({ weatherJson: JSON.stringify(bd.weather) });
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