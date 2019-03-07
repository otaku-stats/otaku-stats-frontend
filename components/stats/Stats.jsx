import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Stats.css';
import Input from '../../elements/input/Input';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            season: 'latest',
            year: ''
        }
    }

    handleInputChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    getStatsForTimeframe() {

    }

    render() {
        const { searchString } = this.state;

        return (
            <div className="stats">
                <div className="heading">
                    <h1>Stats by Season</h1>
                </div>
                <form className="search-form">
                    <div className="left-form-elements">
                        <Input
                            autoFocus
                            value={ searchString }
                            placeholder="Search..."
                            onChange={ e => this.handleInputChange('searchString', e.target.value) }
                            fullWidth
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
        animeStats: state.stats.animeStats
    }
};

export default connect(mapStateToProps)(Stats);