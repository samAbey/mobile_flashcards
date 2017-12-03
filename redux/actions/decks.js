import { AsyncStorage } from 'react-native';
import { DECK_KEY } from '../../utils/helpers';

export const getAllDecks = (value) => {

    console.log(value)
    return dispatch => {
        dispatch({
            type: 'RECEIVING_DECKS'
        });

        dispatch({
            type: 'DECKS_RECEIVED',
            data: value
        });
    }
}