import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk';
import adReducer from './reducers/AdReducer';

const store = createStore(
    adReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
