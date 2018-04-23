import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from '../utils/setAuthorizationToken';
import myCircleServer from '../myCircleServer'

import { SET_CURRENT_USER, CLEAR_STORAGE } from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function clearStorage() {
    return {
        type: CLEAR_STORAGE
    };
}

export function login(loginData) {
    return dispatch => {
        return myCircleServer.post('/api/authenticate',loginData).then(res => {
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

export function logout() {
    return dispatch => {
        try {
           AsyncStorage.removeItem('jwtToken');
        } catch (error) {
           console.log('error:' + error);
        }
        setAuthorizationToken();
        dispatch(setCurrentUser());
        dispatch(clearStorage());
    }
}
