import { createStore, combineReducers, applyMiddleware } from "redux";
import authorizeReducer from "./authorizeReducer";
import ThunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    authorizePage: authorizeReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));
export default store;
