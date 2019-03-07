const stats = (state = {} , action) => {
    switch(action.type) {
        case 'ANIME_STATS':
            return { ...state, animeStats: action.animeStats };
        default:
            return state
    }
}

export default stats;