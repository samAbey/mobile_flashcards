import { DECKS_RECEIVED }from '../action-types';

export const decks = (state={}, action) => {

    switch(action.type) {
        case DECKS_RECEIVED:
            return action.data;

        default:
            return state;
    }
}