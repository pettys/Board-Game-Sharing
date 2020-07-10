import { combineReducers } from 'redux';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const ownedGames = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_OWNED_GAMES':
      return action.payload;
    case 'RESET_USER_OWNED_GAMES':
      return [];
    default:
      return state;
  }
};

const alerts = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_REQUESTED_LOANS':
      return action.payload;
    case 'RESET_USER_REQUESTED_LOANS':
      return [];
    default:
      return state;
  }
};

const friends = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_FRIENDS':
      return action.payload;
    case 'RESET_USER_FRIENDS':
      return [];
    default:
      return state;
  }
};

const profileVisibility = (state = 1, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE_VISIBILITY':
      return action.payload;
    case 'RESET_USER_PROFILE_VISIBILITY':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default combineReducers({
  userAttributes: userReducer,
  ownedGames,
  friends,
  alerts,
  profileVisibility
});
