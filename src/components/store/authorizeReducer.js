import {authorizeAPI} from "../API/authorizeAPI";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";

/*const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };*/

let initialState = {
    token: '',
    error: ''
};

const authReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log('success');
            newState.token = action.data.token;
            return newState
        case LOGIN_FAIL:
            newState.token = '';
            newState.error = 'Invalid data';
            return newState
        case LOGOUT:
            newState.token = '';
            return newState
        default:
            return state;
    }
};

//action creators


/*export function loginThunk(email, password){
    return (dispatch) => {
        authorizeAPI.login(email, password).then(data => {
            if (data !== undefined){
                dispatch(addNews());
            } else {

            }
        });
    }
}*/


export function loginActionCreator(token) {
    if (token !== null)
        return {type: LOGIN_FAIL, token: ''}
    else
        return {type: LOGIN_FAIL, token: token}
}


export const login = (email, password) => (dispatch) => {       //изменить
    return authorizeAPI.login(email, password).then(
        (data) => {
            console.log(data);
            console.log(data.response.status);
            if(data.response.status === 400) {
                console.log("error");
                dispatch({
                    type: LOGIN_FAIL,
                });
                return Promise.reject();
            }
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { token: data },
            });
            return Promise.resolve();
        }/*,
        (error) => {
            dispatch({
                type: LOGIN_FAIL,
            });
            return Promise.reject();
        }*/
    );
};

export const logout = () => (dispatch) => {
    authorizeAPI.logout();
    dispatch({
        type: LOGOUT,
    });
};

export function loginThunkCreator(email, password) {
    return (dispatch) => {
        authorizeAPI.login(email, password).then(data => {
           dispatch(loginActionCreator(data))
        });
    }
}

export default authReducer;