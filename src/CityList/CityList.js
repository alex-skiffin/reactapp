import React, { Component } from 'react';
import './CityList.css';

class CityList extends Component {
    getDefaultLocation() {
        return ['Moscow'];
    }

    addLocation(location) {
        if (location && !this.state.cityList.includes(location))
            this.state.cityList.push(location);
    }

    getLocations() {
        if (typeof (Storage) === 'undefined')
            return this.getDefaultLocation();

        let locations = localStorage.getItem('locations');
        let locationsJson = JSON.parse(locations);
        if (!locationsJson)
            locationsJson = this.getDefaultLocation();

        localStorage.setItem('locations', JSON.stringify(locationsJson));

        return locationsJson;
    }
    constructor(props) {
        super(props);
        this.state = { cityList: this.getLocations(), inputValue: '' };
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addLocation = this.addLocation.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.addLocation(this.state.inputValue);
        this.setState({ inputValue: '' });
        localStorage.setItem('locations', JSON.stringify(this.state.cityList));
    }

    handleCityChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    deleteElement(element) {
        if (this.state.cityList.indexOf(element) !== -1)
            this.state.cityList.splice(this.state.cityList.indexOf(element), 1);
        localStorage.setItem('locations', JSON.stringify(this.state.cityList));
        this.forceUpdate();
    }

    render() {
        return (
            <div className="Cities">
                <form className="City-buttons" onSubmit={this.handleSubmit}>
                    <input type="text"
                        placeholder="city"
                        value={this.state.inputValue}
                        onChange={this.handleCityChange} />
                    <button>Add</button>
                </form>
                <div className="City-list">
                    <ul>{this.state.cityList.map(title =>
                        <div key={title+'_div'} className="City">
                            <li key={title+'_li'}>{title}</li>
                            <button key={title+'_button'} onClick={this.deleteElement.bind(this, title)}>X</button>
                        </div>
                    )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default CityList;