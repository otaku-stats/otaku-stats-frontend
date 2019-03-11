import React, { Component }  from 'react';
import { connect, dispatch } from 'react-redux';
import './SearchResults.css';
import '../../resources/shared.css';

class SearchResults extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        const {  } = this.state;
        const { searchResults } = this.props;

        return (
            <div className="search-results-wrapper">
                <div className="heading">
                    <h1>Search Results</h1>
                </div>
                <div className="results">

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchResults: state.search.get('searchResults'),
        totalResults: state.search.get('totalResults')
    }
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);