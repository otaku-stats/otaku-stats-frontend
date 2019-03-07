import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Home.css';
import Input from '../../elements/input/Input';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: ''
        }
    }

    handleInputChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    searchAnime() {

    }

    render() {
        const { searchString } = this.state;

        return (
            <div className="landing">
                <div className="heading">
                    <h1>Otaku Stats</h1>
                    <h2>Search for specific anime and trends</h2>
                </div>
                <form className="search-form">
                    <div className="left-form-elements">
                        <Input
                            autoFocus
                            value={ searchString }
                            placeholder="Search..."
                            onChange={ e => this.handleInputChange('searchString', e.target.value) }
                            fullWidth
                            searchButton
                            onSearchClick={ () => this.searchAnime() }
                        />
                    </div>
                    <div className="right-form-elements">
                    </div>
                </form>
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