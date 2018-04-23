import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from '../utils/setAuthorizationToken';
import myCircleServer from '../myCircleServer'

import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function signup(signupData) {
    return dispatch => {
        return myCircleServer.post('/api/users',signupData).then(res => {
            const token = res.data.token;
            try {
                AsyncStorage.setItem('jwtToken', token);
            } catch (error) {
                console.log('error:' + error);
            }
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwtDecode(token)));
        })
    }
}
