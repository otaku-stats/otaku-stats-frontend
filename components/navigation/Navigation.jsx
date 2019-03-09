import React  from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faInfoCircle, faSearch } from "@fortawesome/free-solid-svg-icons/index";
import './Navigation.css';
import '../../resources/shared.css';

const Navigation = () => (
    <nav className="heading">
        <Link to="/alpha/resources/otaku-stats-site/" className="link">
            <h2>Otaku Stats</h2>
        </Link>
        <div className="little-links">
            <Link to="/alpha/resources/otaku-stats-site/stats" className="link">
                <FontAwesomeIcon icon={ faChartPie } />
                <span>Stats</span>
            </Link>
            <Link to="/alpha/resources/otaku-stats-site/about" className="link">
                <FontAwesomeIcon icon={ faInfoCircle } />
                <span>About</span>
            </Link>
        </div>
    </nav>
);

export default Navigation;
