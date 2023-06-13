import { createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import {sessionStorageMiddleware} from './middleware/sessionStorage';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(sessionStorageMiddleware));

export default store;
