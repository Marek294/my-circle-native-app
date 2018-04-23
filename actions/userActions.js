import myCircleServer from '../myCircleServer'

import { SET_POSTS, SET_CIRCLES, SET_USERS_NOT_IN_CIRCLE, FETCHING_DATA, SET_ERROR, FETCHING_CIRCLES_DATA, SET_USER_IS_ADMIN, SET_COMMENTS, STOP_FETCHING_DATA, SET_USERS_IN_CIRCLE, CLEAR_CIRCLE, PUSH_POST} from './types';

export function getData() {
  return {
    type: FETCHING_DATA
  }
}

export function stopFetchingData() {
  return {
    type: STOP_FETCHING_DATA
  }
}

export function clearCircle() {
  return {
    type: CLEAR_CIRCLE
  }
}

export function getCirclesListData() {
  return {
    type: FETCHING_CIRCLES_DATA
  }
}

export function setError(errors) {
  return {
    type: SET_ERROR,
    errors
  }
}

export function setPosts(id, name, posts) {
  return {
    type: SET_POSTS,
    id,
    name,
    posts,
    isFetching: false
  };
}

export function setComments(post, commentaries) {
  return {
    type: SET_COMMENTS,
    post,
    commentaries,
    isFetching: false
  }
}

export function setUsersNotInCircle(users) {
  return {
    type: SET_USERS_NOT_IN_CIRCLE,
    users,
    isFetching: false,
    errors: {}
  };
}

export function setUsersInCircle(users) {
  return {
    type: SET_USERS_IN_CIRCLE,
    users,
    isFetching: false,
    errors: {}
  };
}

export function setCircles(circles) {
  return {
    type: SET_CIRCLES,
    circles,
    isFetching: false
  };
}

export function setUserIsAdmin(data) {
  return {
    type: SET_USER_IS_ADMIN,
    isAdmin: data.isAdmin
  }
}

export function pushPost(data) {
  return {
    type: PUSH_POST,
    data
  }
}

export function getCurrentUser() {
    return dispatch => {
        return myCircleServer.get('/api/users/me');
    }
}

export function userIsAdmin(id) {
    return dispatch => {
        return myCircleServer.get(`/api/circles/user/${id}/isAdmin`);
    }
}

export function getCircleList() {
     return dispatch => {
         dispatch(getCirclesListData());
         return myCircleServer.get('/api/circles/');
     }
 }

export function getCircleListInterval() {
     return dispatch => {
         return myCircleServer.get('/api/circles/');
     }
 }

export function getPosts(id) {
    return dispatch => {
        dispatch(getData());
        return myCircleServer.get(`/api/posts/${id}`);
    }
}

export function getComments(postId) {
  return dispatch => {
      dispatch(getData());
      return myCircleServer.get(`api/commentaries/${postId}`);
  }
}

export function addCircle(circleData) {
    return dispatch => {
        return myCircleServer.post('/api/circles/',circleData);
    }
}

export function addPost(postData) {
    return dispatch => {
        return myCircleServer.post('/api/posts/',postData);
    }
}

export function getUsersNotInCircle(circleId) {
    return dispatch => {
        dispatch(getData());
        return myCircleServer.get(`/api/circles/userNotIn/${circleId}`);
    }
}

export function getUsersInCircle(circleId) {
    return dispatch => {
        dispatch(getData());
        return myCircleServer.get(`/api/circles/user/${circleId}`);
    }
}

export function addUserToCircle(saveUser) {
  return dispatch => {
    dispatch(getData());
    return myCircleServer.post('/api/circles/user',saveUser);
  }
}

export function removeUserFromCircle(userId, circleId) {
  return dispatch => {
      dispatch(getData());
      return myCircleServer.delete(`/api/circles/user/${circleId}/${userId}`);
    }
}

export function getVote(postId) {
  return dispatch => {
    //dispatch(getData());
    return myCircleServer.get(`/api/posts/vote/${postId}`);
  }
}

export function setVote(voteObject) {
  return dispatch => {
    return myCircleServer.post('/api/posts/vote/',voteObject);
  }
}

export function addComment(commentObject) {
  return dispatch => {
    return myCircleServer.post('/api/commentaries',commentObject);
  }
}

export function leaveCircle(circleId) {
  return dispatch => {
    return myCircleServer.get(`/api/circles/user/leave/${circleId}`);
  }
}

export function deleteCircle(circleId) {
  return dispatch => {
    dispatch(clearCircle());
    dispatch(getData());
    return myCircleServer.delete(`/api/circles/${circleId}`);
  }
}

export function deleteComment(commentId) {
  return dispatch => {
    dispatch(getData());
    return myCircleServer.delete(`/api/commentaries/${commentId}`);
  }
}

export function deletePost(postId) {
  return dispatch => {
    return myCircleServer.delete(`/api/posts/${postId}`);
  }
}

export function stopFetch() {
  return dispatch => {
    return dispatch(stopFetchingData());
  }
}
