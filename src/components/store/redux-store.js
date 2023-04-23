import { createStore, combineReducers, applyMiddleware } from "redux";
import authorizeReducer from "./authorizeReducer";
import ThunkMiddleware from "redux-thunk";
import groupsReducer from "./groupsReducer";

let reducers = combineReducers({
    authorizePage: authorizeReducer,
    groupsPage : groupsReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));
export default store;
