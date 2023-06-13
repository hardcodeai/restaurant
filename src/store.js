import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';

// Combine multiple reducers into a single rootReducer
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
