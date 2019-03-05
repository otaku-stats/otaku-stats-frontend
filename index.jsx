import React from 'react'
import { render } from 'react-dom'
import configureStore from 'store'
import { Provider } from 'react-redux'
import Home from './components/home/Home.jsx';

const store = configureStore()

render(
    <Provider store= { store }>
        <Home/>
    </Provider>
    ,
    document.getElementById('app')
)
