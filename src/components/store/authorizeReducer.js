import {authorizeAPI} from "../API/authorizeAPI";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";

let initialState = {
    token: '',
    error: '',
    role: ''
};

const authReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log('success');
            newState.token = action.data.token;
            newState.error = '';
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

export function loginActionCreator(token) {
    if (token !== null)
        return {type: LOGIN_SUCCESS, token: token}
    else
        return {type: LOGIN_FAIL, token: ''}
}

export const login = (email, password) => (dispatch) => {       //изменить
    return authorizeAPI.login(email, password).then(
        (data) => {
            console.log(data);
            if(data === '') {
                console.log("error");
                dispatch({
                    type: LOGIN_FAIL,
                });
                return Promise.reject();
            }
            dispatch({
                type: LOGIN_SUCCESS,
                data: { token: data },
            });
            return Promise.resolve();
        }
    );
};

export const registration = (fullName, birthDate, email, password, confirmPassword) => (dispatch) => {
  return authorizeAPI.registration(fullName, birthDate, email, password, confirmPassword).then(
      (data) => {
          console.log(data);
          if(data === '') {
              console.log("error");
              dispatch({
                  type: LOGIN_FAIL,
              });
              return Promise.reject();
          }
          dispatch({
              type: LOGIN_SUCCESS,
              data: { token: data },
          });
          return Promise.resolve();
      }
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