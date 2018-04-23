import { SET_CIRCLES, FETCHING_CIRCLES_DATA } from '../actions/types';

const initialState = {
    circles: [],
    isFetching: false
};

export default ( state = initialState, action = {}) => {
    switch(action.type) {
        case SET_CIRCLES:
            return {
                ...state,
                circles: action.circles,
                isFetching: false
            };
        case FETCHING_CIRCLES_DATA:
            return {
                ...state,
                isFetching: true
            }
        default: return state;
    }
}
