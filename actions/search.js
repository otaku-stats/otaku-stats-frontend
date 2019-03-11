import axios from 'axios';
import { genreMapping } from '../resources/genreMapping';
import { generateRandomHexColor } from '../resources/helpers';
import { sampleSearchResults } from '../resources/sampleData/sampleSearchResults';

export const searchAnime = (queryObj) => {
    return (dispatch) => {
        // Using sample data for now!
        // axios.post('https://r1ionjnnm6.execute-api.us-east-1.amazonaws.com/alpha/search', queryObj)
        //     .then((response) =>
        dispatch({
            type: 'SEARCH_ANIME',
            searchResults: sampleSearchResults.hits,
            totalResults: sampleSearchResults.hits.total
        })
        // );
    }
};
