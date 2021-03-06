import { createStore, combineReducers, compose } from 'redux';
// import thunk from 'redux-thunk';
import dataReducer from './reducers/dataReducer';
import userReducer from './reducers/userReducer';

const initialState = {};

// const middleware = [thunk];

const reducers = combineReducers({
    data: dataReducer,
    user: userReducer
});

const store = createStore(reducers, initialState, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;