import { combineReducers } from 'redux';
import search from 'reducers/search';
import stats from 'reducers/stats';

const reducers = combineReducers({
    search,
    stats
});
  
export default reducers;