import axios from 'axios';

export const getWeather = () => {
    return (dispatch) => {
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=boston&appid=87555e4dc613f2ff4b9a09e198382868' )
            .then((response) =>
                dispatch({
                    type: 'WEATHER',
                    weatherData: response.data
                }));
    }
}