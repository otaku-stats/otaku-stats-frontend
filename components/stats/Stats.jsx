import React, { Component }  from 'react'
import './Stats.css';
import '../../resources/shared.css';
import Select from '../../elements/select/Select';
import {connect} from "react-redux";

const seasonOptions = [
    {
        label: "Winter",
        value: "winter"
    },
    {
        label: "Spring",
        value: "spring"
    },
    {
        label: "Summer",
        value: "summer"
    },
    {
        label: "Autumn",
        value: "autumn"
    },
];

const yearOptions = [];

class Stats extends Component {
    constructor() {
        super();
        this.state = {
            selectedSeason: 'winter'
        };
    }

    render() {
        const { selectedSeason } = this.state;

        return (
            <div className="stats-wrapper">
                <div className="heading">
                    <h1>Stats</h1>
                </div>
                <div className="season-selection">
                    <Select
                        options={ seasonOptions }
                        onChange={ (e) => this.setState({ selectedSeason: e.target.value }) }
                    />

                </div>
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