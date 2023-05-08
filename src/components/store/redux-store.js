import { createStore, combineReducers, applyMiddleware } from "redux";
import authorizeReducer from "./authorizeReducer";
import ThunkMiddleware from "redux-thunk";
import groupsReducer from "./groupsReducer";
import coursesReducer from "./coursesReducer";

let reducers = combineReducers({
    authorizePage: authorizeReducer,
    groupsPage : groupsReducer,
    coursesPage: coursesReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));
export default store;
