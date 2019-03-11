import React, { Component }  from 'react';
import { connect, dispatch } from 'react-redux';
import './Stats.css';
import '../../resources/shared.css';
import { getAnimeStats } from '../../actions/stats';
import Select from '../../elements/select/Select';
import Button from '../../elements/button/Button';
import { PieChart, Pie, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { generateRandomHexColor, range, calculateChartWidth } from '../../resources/helpers';
import { AppConstants } from '../../resources/AppConstants';

const timeframeOptions = [
    {
        label: "Current season",
        value: "current",
        startTime: new Date().setMonth(new Date().getMonth() - 3)
    },
    {
        label: "Past year",
        value: "past-yr",
        startTime: new Date().setFullYear(new Date().getFullYear() - 1)
    },
    {
        label: "Past 5 years",
        value: "past-5-yr",
        startTime: new Date().setFullYear(new Date().getFullYear() - 5)
    },
    {
        label: "Past 10 years",
        value: "past-10-yr",
        startTime: new Date().setFullYear(new Date().getFullYear() - 10)
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
        label: "Fall",
        value: "fall",
        intVal: 9 //October
    },
];

// generate an array of years decending from current year down to 1918
const yearOptions = range(1918, new Date().getFullYear()).reverse().map((year) => {
    return(
        {
            label: year,
            value: year
        })
});

class Stats extends Component {
    constructor() {
        super();
        this.state = {
            presetTimeframe: timeframeOptions[0].value,
            customTimes: {
                startSeason: seasonOptions[0].value,
                startYr: yearOptions[yearOptions.length - 1].value,
                endSeason: seasonOptions[3].value,
                endYr: yearOptions[0].value
            }
        };
    }

    componentDidMount() {
        this.submitTimeframe(timeframeOptions[0].value);
    }

    handleEditPresetTimeframe(value) {

        return this.setState({
            presetTimeframe: value,
        });
    }

    handleEditCustomTimeframe(selection, value) {
        let newCustomTimes = { ...this.state.customTimes };

        newCustomTimes[selection] = value;

        return this.setState({
            customTimes: newCustomTimes
        })
    }

    generateStartAndEndTimes(presetTimeframe, customTimes) {
        let startTime, endTime;

        // if user selected a custom timeframe, generate start and end times from that
        if (presetTimeframe === 'custom') {
            // make a Date object out of selected start year and the month integer value of the season selected
            startTime = Date.parse(Date(customTimes.startYr, seasonOptions.find((season) => {
                return season.value === customTimes.startSeason
            }).intVal));

            endTime = Date.parse(Date(customTimes.endYr, seasonOptions.find((season) => {
                return season.value === customTimes.endSeason
            }).intVal));
        // otherwise, generate start and end times from the preset timeframe they selected
        } else {
            startTime = timeframeOptions.find((option) => { return option.value === presetTimeframe }).startTime;
            endTime = Date.parse(new Date())
        }

        return {
            startTime,
            endTime
        };
    }

    submitTimeframe(presetTimeframe) {
        const { customTimes } = this.state;
        const times = this.generateStartAndEndTimes(presetTimeframe, customTimes);

        this.props.getStats(times.startTime, times.endTime);
    }

    render() {
        const { presetTimeframe, customTimes } = this.state;
        const { stats, totalGenreDistribution, genresPerSeason, genresList } = this.props;

        return (
            <div className="stats-wrapper">
                <div className="heading">
                    <h1>Stats</h1>
                    <div className="season-selection">
                        <Select
                            options={ timeframeOptions }
                            onChange={ (e) => this.handleEditPresetTimeframe(e.target.value) }
                            selected={ presetTimeframe }
                            size={ AppConstants.Sizes.md }
                        />
                        { presetTimeframe === 'custom' &&
                            <div className="custom-timepicker">
                                <div>
                                    <Select
                                        options={ seasonOptions }
                                        onChange={ (e) => this.handleEditCustomTimeframe('startSeason', e.target.value) }
                                        size={ AppConstants.Sizes.sm }
                                        selected={ customTimes.startSeason }
                                    />
                                    <Select
                                        options={ yearOptions }
                                        onChange={ (e) => this.handleEditCustomTimeframe('startYr', e.target.value) }
                                        size={ AppConstants.Sizes.sm }
                                        selected={ customTimes.startYr }
                                    />
                                </div>
                                <span>to</span>
                                <div>
                                    <Select
                                        options={ seasonOptions }
                                        onChange={ (e) => this.handleEditCustomTimeframe('endSeason', e.target.value) }
                                        size={ AppConstants.Sizes.sm }
                                        selected={ customTimes.endSeason }
                                    />
                                    <Select
                                        options={ yearOptions }
                                        onChange={ (e) => this.handleEditCustomTimeframe('endYr', e.target.value) }
                                        size={ AppConstants.Sizes.sm }
                                        selected={ customTimes.endYr }
                                    />
                                </div>
                            </div>
                        }
                        <Button
                            onClick={ () => this.submitTimeframe(presetTimeframe) }
                            value="Search"
                            type="primary"
                        />

                    </div>
                </div>
                <div className="charts">
                    <div className="pie chart">
                        <h3>Genre distribution</h3>
                        <PieChart width={ calculateChartWidth(1/3) } height={ 245 }>
                            <Pie
                                dataKey="value"
                                isAnimationActive={ true }
                                data={ totalGenreDistribution }
                                cx={ calculateChartWidth(1/3)/3.2 } cy={ 110 }
                                outerRadius={ 90 }
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
                            width={ calculateChartWidth(2/3) }
                            height={265}
                            data={ genresPerSeason }
                            margin={{ top: 5, right: 50, left: 5, bottom: 5 }}
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