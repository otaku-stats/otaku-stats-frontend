import React, { Component } from 'react'
import { getWeather } from '../../actions/home.js'
import { connect } from 'react-redux';

class Home extends Component {

    getWeatherData() {
        this.props.dispatch(getWeather());
    }

    render() {
        const { weatherData } = this.props;

        return (
            <div>
                <p>hello world</p>
                <button onClick={ () => this.getWeatherData() }>
                    Request weather data
                </button>
                { weatherData && weatherData.main.temp }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weatherData: state.home.weatherData
    }
};

export default connect(mapStateToProps)(Home);