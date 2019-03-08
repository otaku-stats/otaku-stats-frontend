import React  from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faCrow, faInfoCircle } from "@fortawesome/free-solid-svg-icons/index";
import './Navigation.css';
import '../../resources/shared.css';

const Navigation = () => (
    <nav className="heading">
        <Link to="/" className="link">
            <h2>Otaku Stats</h2>
        </Link>
        <div className="little-links">
            <Link to="stats" className="link">
                <FontAwesomeIcon icon={ faChartPie } />
                <span>Stats</span>
            </Link>
            <Link to="about" className="link">
                <FontAwesomeIcon icon={ faInfoCircle } />
                <span>About</span>
            </Link>
        </div>
    </nav>
);

export default Navigation;
