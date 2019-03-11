import { fromJS, Map, List } from 'immutable';

const initialState = Map({
    searchResults: List([]),
    totalResults: 0
});

const search = (state = initialState, action) => {
    switch(action.type) {
        case 'SEARCH_ANIME':
            return state.set('searchResults', fromJS(action.searchResults))
                .set('totalResults', action.totalResults);
        default:
            return state;
    }
};

export default search;
