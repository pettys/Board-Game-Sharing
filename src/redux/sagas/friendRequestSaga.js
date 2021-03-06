import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

// This saga will catch a dispatch for sending a friend request.
function* friendRequest(action) {
  try {
    yield axios.post('/api/search/users/other-user-request', {
      otherUserID: action.payload.otherUserID,
      message: action.payload.message,
      actionType: 'friend'
    });
    yield put({ type: 'SET_FRIEND_REQUEST_SENT_SUCCESSFULLY', payload: 'Successfully submitted friend request!' });
    // TODO update the global state so it can display if a friend request is pending,
    // or the user in question blocked the current user.
  } catch (error) {
    yield put({ type: 'SET_USER_SEARCH__USER_NOT_FOUND', payload: 'The server encountered an error making that friend request.' });
    console.log('User get request failed', error);
  }
}

// Update the status of a friend request.
function* updateRequest(action) {
  try {
    yield axios.post('/api/search/users/update-friend-request', {
      alertID: action.payload.alertID,
      agreed: action.payload.agreed,
      friendRequestID: action.payload.friendRequestID
    });
    yield put({ type: 'SET_FRIEND_REQUEST_SENT_SUCCESSFULLY', payload: 'Successfully added this friend!' });
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    yield put({ type: 'SET_USER_SEARCH__USER_NOT_FOUND', payload: 'Server error trying to make the friend request' });
    yield put({ type: 'SET_ERROR_UPDATING_FRIEND_REQUEST_STATUS', payload: 'Server error trying to update the friend status' });
    console.log('Error', error);
  }
}

function* userSaga() {
  yield takeEvery('CREATE_FRIEND_REQUEST', friendRequest);
  yield takeEvery('SET_FRIEND_REQUEST_UPDATED_STATE', updateRequest);
}

export default userSaga;
