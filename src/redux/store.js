// constainer of my state user state
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducers";
import uiReducer from "./reducers/uiReducer";
import externalApiReducer from "./reducers/externalApiReducer";
const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data:dataReducer,
    UI:uiReducer,
    externalApi:externalApiReducer
});

 const store = createStore ( 
     reducers, 
     initialState, 
    compose(
        applyMiddleware(...middleware)       
    )
 );

 export default store;