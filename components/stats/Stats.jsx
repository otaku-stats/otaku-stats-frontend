import React, { Component }  from 'react';
import { dispatch } from 'react-redux';
import './Stats.css';
import '../../resources/shared.css';
import Select from '../../elements/select/Select';
import {connect} from 'react-redux';
import { getAnimeStats } from '../../actions/stats';
import Button from '../../elements/button/Button';
import { PieChart, Pie, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { generateRandomHexColor } from '../../resources/graphColors';

const currentDate = new Date();
const timeframeOptions = [
    {
        label: "Current season",
        value: "current",
        startTime: currentDate.setMonth(currentDate.getMonth() - 3)
    },
    {
        label: "Past year",
        value: "past-yr",
        startTime: currentDate.setFullYear(currentDate.getFullYear() - 1)
    },
    {
        label: "Past 5 years",
        value: "past-5-yr",
        startTime: currentDate.setFullYear(currentDate.getFullYear() - 5)
    },
    {
        label: "Past 10 years",
        value: "past-10-yr",
        startTime: currentDate.setFullYear(currentDate.getFullYear() - 10)
    },
    {
        label: "Custom",
        value: "custom"
    },
];


const seasonOptions = [
    {
        label: "Winter",
        value: "winter",
        intVal: 0 // January
    },
    {
        label: "Spring",
        value: "spring",
        intVal: 3 // April
    },
    {
        label: "Summer",
        value: "summer",
        intVal: 6 //July
    },
    {
        label: "Autumn",
        value: "autumn",
        intVal: 9 //October
    },
];

const yearOptions = [];

const data01 =
    [
        {name: 'Group A', value: 400, fill: 'purple'},
        {name: 'Group B', value: 300},
        {name: 'Group C', value: 300},
        {name: 'Group D', value: 200},
        {name: 'Group E', value: 278},
        {name: 'Group F', value: 189}
    ];

class Stats extends Component {
    constructor() {
        super();
        this.state = {
            selectedTimeframe: {
                preset: 'current',
                startTime: '',
                endTime: '',
                custom: {
                    startSeason: '',
                    startYr: '',
                    endSeason: '',
                    endYr: ''
                }
            },

        };
    }

    generateCustomTimeframe() {
        const custom = this.state.selectedTimeframe.custom;

        const startTime = Date(custom.startYr, custom.startSeason);
        const endTime = Date(custom.endYr, custom.endSeason);

        return state.set({
            selectedTimeframe: {
                startTime,
                endTime
            }
        })
    }

    getStats() {
        const { startTime, endTime, getStats } = this.props;

        getStats(startTime, endTime);
    }

    render() {
        const { stats, totalGenreDistribution, genresPerSeason, genresList } = this.props;

        return (
            <div className="stats-wrapper">
                <div className="heading">
                    <h1>Stats</h1>
                    <div className="season-selection">
                        <Select
                            options={ timeframeOptions }
                            onChange={ (e) => this.setState({ selectedTimeframe: e.target.value }) }
                        />
                        <Select
                            options={ seasonOptions }
                            onChange={ (e) => this.setState({ selectedSeason: e.target.value }) }
                        />
                        <Button
                            onClick={ () => this.getStats() }
                            value="Get stats"
                            type="primary"
                        />

                    </div>
                </div>
                <div className="charts">
                    <div className="pie chart">
                        <h3>Genre distribution</h3>
                        <PieChart width={ 480 } height={ 300 }>
                            <Pie
                                dataKey="value"
                                isAnimationActive={ true }
                                data={ totalGenreDistribution }
                                cx={ 160 } cy={ 150 }
                                outerRadius={ 120 }
                                fill="red"
                                label
                            />
                            <Tooltip />
                            <Legend
                                layout="vertical"
                                align="right"
                            />
                        </PieChart>
                    </div>

                    <div className="line chart">
                        <h3>Genre prevalence per season</h3>
                        <LineChart
                            width={900}
                            height={400}
                            data={ genresPerSeason }
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="season" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            { genresList.map((genre) => {
                                return (
                                    <Line
                                        key={ 'genre-' + genre }
                                        type="monotone"
                                        dataKey={ genre }
                                        stroke={ generateRandomHexColor() }
                                        activeDot={{ r: 8 }} />
                                );
                            }) }
                        </LineChart>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stats: state.stats.get('animeStats'),
        totalGenreDistribution: state.stats.get('totalGenreDistribution').toJS(),
        genresPerSeason: state.stats.get('genresPerSeason').toJS(),
        genresList: state.stats.get('genresList'), // used with ^^
    }
};

const mapDispatchToProps = dispatch => ({
    getStats: (startTime, endTime) => dispatch(getAnimeStats(startTime, endTime))
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);