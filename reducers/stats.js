import { fromJS, Map, List } from 'immutable';

const initialState = Map({
    animeStats: Map({}),
    totalGenreDistribution: List([]),
});

const stats = (state = initialState, action) => {
    switch(action.type) {
        case 'ANIME_STATS':
            return state.set('animeStats', fromJS(action.animeStats))
                .set('totalGenreDistribution', fromJS(action.totalGenreDistribution));
        default:
            return state;
    }
};

export default stats;
