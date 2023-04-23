import {authorizeAPI} from "../API/authorizeAPI";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";
const GET_ROLE = "GET_ROLE";
const GET_PROFILE = "GET_PROFILE";

let initialState = {
    token: '',
    error: '',
    isTeacher: false,
    isStudent: false,
    isAdmin: false,
    email: '',
    fullName: '',
    birthDate: ''

};

const authReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log('success');
            newState.token = action.data.token;
            newState.email = action.data.email;
            newState.error = '';
            return newState
        case LOGIN_FAIL:
            newState.token = '';
            newState.email = '';
            newState.error = 'Invalid data';
            return newState
        case LOGOUT:
            newState.token = '';
            return newState
        case GET_ROLE:
            newState.isAdmin = action.data.isAdmin;
            newState.isTeacher = action.data.isTeacher;
            newState.isStudent = action.data.isStudent;
            return newState
        case GET_PROFILE:
            newState.email = action.data.email;
            newState.fullName = action.data.fullName;
            newState.birthDate = action.data.birthDate;
            return newState
        default:
            return state;
    }
};

export const getProfile = (token) => (dispatch) => {       //изменить
    return authorizeAPI.profile(token).then(
        (data) => {
            //console.log(data);
            if(data === '') {
                //console.log("error");
                dispatch({
                    type: LOGIN_FAIL,
                });
                return Promise.reject();
            }
            dispatch({
                type: GET_PROFILE,
                data: { email: data.email, birthDate: data.birthDate, fullName: data.fullName },
            });
            return Promise.resolve();
        }
    );
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
            //console.log(data);
            if(data === '') {
                //console.log("error");
                dispatch({
                    type: LOGIN_FAIL,
                });
                return Promise.reject();
            }
            localStorage.setItem("user", email);
            dispatch({
                type: LOGIN_SUCCESS,
                data: { token: data, email: email },
            });
            return Promise.resolve();
        }
    );
};

export const registration1 = (fullName, birthDate, email, password, confirmPassword) => (dispatch) => {
  return authorizeAPI.registration(fullName, birthDate, email, password, confirmPassword).then(
      (data) => {
          //console.log(data);
          if(data === '') {
              //console.log("error");
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

export const logout = (token) => (dispatch) => {
    return authorizeAPI.logout(token).then (
        (status) => {
            //console.log(status);
            if(status !== 200) {
                //console.log("error");
                return Promise.reject();
            }
            dispatch({
                type: LOGOUT,
            });
            localStorage.setItem("user", '');
            return Promise.resolve();
        }
    );
};

export const getUserRole = (token) => (dispatch) => {
    return authorizeAPI.role(token).then (
        (data) => {
            if(data === '') {
                //console.log("failed to get role");
                return Promise.reject();
            }
            dispatch({
                type: GET_ROLE,
                data: {
                    isTeacher: data.isTeacher,
                    isStudent: data.isStudent,
                    isAdmin: data.isAdmin
                }
            });
            return Promise.resolve();
        }
    );
};

export function loginThunkCreator(email, password) {
    return (dispatch) => {
        authorizeAPI.login(email, password).then(data => {
           dispatch(loginActionCreator(data));
        });
    }
}

export default authReducer;