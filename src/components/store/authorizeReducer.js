import {authorizeAPI} from "../API/authorizeAPI";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";
const GET_ROLE_SUCCESS = "GET_ROLE_SUCCESS";
const GET_ROLE_FAILED = "GET_ROLE_FAILED";
const GET_PROFILE = "GET_PROFILE";
const EDIT_SUCCESS = "EDIT_SUCCESS";
const EDIT_FAILED = "EDIT_FAILED";

let initialState = {
    token: '',
    isTeacher: false,
    isStudent: false,
    isAdmin: false,
    email: '',
    fullName: '',
    birthDate: '',
    errors: []
};

const authReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOGIN_SUCCESS:
            newState.token = action.token;
            newState.email = action.email;
            newState.errors = [];
            return newState
        case LOGIN_FAIL:
            newState.token = '';
            newState.email = '';
            newState.errors = action.errors;
            return newState
        case LOGOUT:
            newState.token = '';
            newState.email = '';
            return newState
        case GET_ROLE_SUCCESS:
            newState.isAdmin = action.isAdmin;
            newState.isTeacher = action.isTeacher;
            newState.isStudent = action.isStudent;
            return newState
        case GET_ROLE_FAILED:
            newState.isAdmin = '';
            newState.isTeacher = '';
            newState.isStudent = '';
            return newState;
        case GET_PROFILE:
            newState.email = action.email;
            newState.fullName = action.fullName;
            newState.birthDate = action.birthDate;
            return newState
        case EDIT_SUCCESS:
            newState.fullName = action.fullName;
            newState.birthDate = action.birthDate;
            return newState
        case EDIT_FAILED:
            newState.errors = action.errors
            return newState;
        default:
            return state;
    }
};

export function editProfileActionCreator(data) {
    if (data.status === 200)
        return {type: EDIT_SUCCESS, fullName: data.profile.fullName, birthDate: data.profile.birthDate }
    else
        return {type: EDIT_FAILED, errors: data.errors}
}

export function logoutActionCreator() {
    return {type: LOGOUT}
}

export function getUserRoleActionCreator(data) {
    if (data.status === 200)
        return {type: GET_ROLE_SUCCESS, isTeacher: data.role.isTeacher, isStudent: data.role.isStudent, isAdmin: data.role.isAdmin}
    else
        return {type: GET_ROLE_FAILED}
}

export function getProfileActionCreator(data) {
    if (data.status === 200)
        return {type: GET_PROFILE, email: data.profile.email, birthDate: data.profile.birthDate, fullName: data.profile.fullName}
    else
        return {type: LOGIN_FAIL, errors: data.errors}
}

export function loginActionCreator(data, email) {
    if (data.status === 200)
        return {type: LOGIN_SUCCESS, token: data.token, email: email}
    else
        return {type: LOGIN_FAIL, errors: data.errors}
}

export const editProfile = (token, fullName, birthDate) => (dispatch) => {
    return authorizeAPI.editProfile(token, fullName, birthDate).then(
        (data) => {
            dispatch(editProfileActionCreator(data));
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    )
};

export const getProfile = (token) => (dispatch) => {
    return authorizeAPI.profile(token).then(
        (data) => {
            dispatch(getProfileActionCreator(data));
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const login = (email, password) => (dispatch) => {       //изменить
    return authorizeAPI.login(email, password).then(
        (data) => {
            console.log(data);
            dispatch(loginActionCreator(data, email));
            if(data.status === 200) {
                localStorage.setItem("user", email);
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const registration1 = (fullName, birthDate, email, password, confirmPassword) => (dispatch) => {
  return authorizeAPI.registration(fullName, birthDate, email, password, confirmPassword).then(
      (data) => {
          dispatch(loginActionCreator(data, email));
          if(data.status === 200) {
              localStorage.setItem("user", email);
              return Promise.resolve();
          }
          return Promise.reject();
      }
  );
};

export const logout = (token) => (dispatch) => {
    return authorizeAPI.logout(token).then (
        (status) => {
            localStorage.setItem("token", '');
            localStorage.setItem("user", '');
            if(status !== 200) {
                return Promise.reject();
            }
            dispatch(logoutActionCreator());
            return Promise.resolve();
        }
    );
};

export const getUserRole = (token) => (dispatch) => {
    return authorizeAPI.role(token).then (
        (data) => {
            dispatch(getUserRoleActionCreator(data));
            if(data.status === 200)
                return Promise.resolve();
            return Promise.reject();
        }
    );
};

export default authReducer;