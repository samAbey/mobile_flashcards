import { combineReducers } from 'redux';
import { decks } from './decks';

const reducers =  combineReducers({
    decks: decks
});

export default reducers;