

export const decks = (state={}, action) => {
    switch(state) {
        case 'DEC_RECEIVED':
            return Object.assign({}, state, action.data);

        default:
            return state;
    }
}