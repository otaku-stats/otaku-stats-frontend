import React  from 'react'
import './Home.css';
import '../../resources/shared.css';
import QueryBuilder from '../QueryBuilder/QueryBuilder';

const Home = () => (
    <div className="landing">
        <div className="heading">
            <h1>Otaku Stats</h1>
            <h2>Search for specific anime and trends</h2>
        </div>
        <QueryBuilder/>
    </div>
);

export default Home;