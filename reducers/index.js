import { combineReducers } from 'redux'
import appData from './dataReducer'
import auth from './auth';
import circle from './circle';
import circleList from './circleList';

const rootReducer = combineReducers({
    appData,
    auth,
    circle,
    circleList
})

export default rootReducer
