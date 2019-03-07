import axios from 'axios';

export const getAnimeStats = () => {
    return (dispatch) => {
        axios.get('https://apiurl' )
            .then((response) =>
                dispatch({
                    type: 'ANIME_STATS',
                    animeStats: response.data
                }));
    }
}