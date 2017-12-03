import { AsyncStorage } from 'react-native';
import { DECK_KEY } from '../../utils/helpers';
import { RECEIVING_DECKS, DECKS_RECEIVED }from '../action-types';

export const getAllDecks = (value) => {

    return dispatch => {
        dispatch({
            type: RECEIVING_DECKS
        });

        dispatch({
            type: DECKS_RECEIVED,
            data: value
        });
    }
}