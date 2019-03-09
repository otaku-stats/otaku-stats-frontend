import React from 'react'
import { render } from 'react-dom'
import configureStore from 'store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/home/Home';
import Stats from './components/stats/Stats';
import About from './components/about/About';
import Navigation from './components/navigation/Navigation';
import './resources/shared.css';

const store = configureStore();

// reference: https://www.codingame.com/playgrounds/6517/react-router-tutorial
render (
    <Provider store= { store }>
        <BrowserRouter>
            <div className="page-wrapper">
                <Navigation/>
                <Route exact path='/alpha/resources/otaku-stats-site/' component={ Home }/>
                {/* TODO fix this later to not need to all be exact, as this is surely redundant */}
                <Route exact path='/alpha/resources/otaku-stats-site/index.html' component={ Home }/>
                <Route exact path='/alpha/resources/otaku-stats-site/stats' component={ Stats }/>
                <Route exact path='/alpha/resources/otaku-stats-site/about' component={ About }/>
            </div>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('app')
);
