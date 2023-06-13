// Action types
const SET_USER_LOGIN = 'SET_USER_LOGIN';
const SET_USER_ID = 'SET_USER_ID';

// Initial state
const initialState = {
  loggedIn: false,
  userId: null,
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
