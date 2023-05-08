import {coursesAPI} from "../API/coursesAPI";

const LOAD_COURSES = "LOAD_COURSES"
const LOAD_USERS = "LOAD_USERS"
const CREATE_COURSE = "CREATE_COURSE"

let initialState = {
    courses: [],
    users: []
}

const coursesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_COURSES:
            newState.courses = action.courses;
            return newState;
        case LOAD_USERS:
            newState.users = action.users;
            return newState;
        default:
            return newState;
    }
}

export function loadCoursesActionCreator(courses) {
    return {type: LOAD_COURSES, courses : courses}
}

export function loadUsersActionCreator(users) {
    return {type: LOAD_USERS, users : users}
}

export function createCourseOfGroupActionCreator() {
    return {type: CREATE_COURSE}
}

export const createCourseOfGroupThunkCreator = (token, id, name, startYear, maximumStudentsCount, semester, requirements, annotations, mainTeacherId) => (dispatch) => {
    return coursesAPI.createCourseOfGroup(token, id, name, startYear, maximumStudentsCount, semester, requirements, annotations, mainTeacherId).then(
        (data) => {
            if(data.status === 200) {
                dispatch(createCourseOfGroupActionCreator());
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const loadCoursesThunkCreator = (token, id) => (dispatch) => {
    return coursesAPI.getListOfCourses(token, id).then(
        (data) => {
            if(data.status === 200) {
                dispatch(loadCoursesActionCreator(data.courses));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const loadUsersThunkCreator = (token) => (dispatch) => {
    return coursesAPI.getListOfUsers(token).then(
        (data) => {
            if(data.status === 200) {
                dispatch(loadUsersActionCreator(data.users));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};


export default coursesReducer;