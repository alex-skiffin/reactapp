import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CityList.css';

class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = { inputValue: '' };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddCity(this.state.inputValue);
        this.setState({ inputValue: '' });
    }

    handleCityChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    deleteElement(element) {
        this.props.onDeleteCity(element);
        this.forceUpdate();
    }
    selectElement(element) {
        this.props.onSelectCity(element);
        this.setState({ selectedElement: element });
    }

    render() {
        const getBackGround = (element) => {
            if (this.state.selectedElement === element)
                return 'selected';
            else
                return '';
        }
        return (
            <div className="Cities">
                <form className="City-buttons" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text"
                        placeholder="city"
                        value={this.state.inputValue}
                        onChange={this.handleCityChange.bind(this)} />
                    <button>Add</button>
                </form>
                <div className="City-list">
                    <ul>{this.props.localState.locations.map(title =>
                        <div key={title + '_div'} className="City" >
                            <li key={title + '_li'} className={getBackGround(title)} onClick={this.selectElement.bind(this, title)}>{title}</li>
                            <button key={title + '_button'} onClick={this.deleteElement.bind(this, title)}>X</button>
                        </div>
                    )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        localState: state
    }),
    dispatch => ({
        onAddCity: (cityName) => {
            dispatch({ type: 'ADD_CITY', payload: cityName });
        },
        onDeleteCity: (cityName) => {
            dispatch({ type: 'REMOVE_CITY', payload: cityName });
        },
        onSelectCity: (cityName) => {
            dispatch({ type: 'SELECT_CITY', payload: cityName })
        }
    })
)(CityList);