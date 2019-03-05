const home = (state = {} , action) => {
    switch(action.type) {
        case 'WEATHER':
            return { ...state, weatherData: action.weatherData };
        default:
            return state
    }
}

export default home;