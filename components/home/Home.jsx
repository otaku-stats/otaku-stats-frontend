import React  from 'react'
import './Home.css';
import '../../resources/shared.css';
import SearchQueryBuilder from '../searchQueryBuilder/SearchQueryBuilder';

const Home = () => (
    <div className="landing">
        <div className="heading">
            <h1>Otaku Stats</h1>
            <h2>Discover specific anime and trends</h2>
        </div>
        <SearchQueryBuilder/>
    </div>
);

export default Home;
