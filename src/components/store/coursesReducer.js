import {coursesAPI} from "../API/coursesAPI";

const LOAD_COURSES = "LOAD_COURSES"
const LOAD_USERS = "LOAD_USERS"
const CREATE_COURSE = "CREATE_COURSE"
const LOAD_DETAILS = "LOAD_DETAILS"
const EDIT_STATUS = "EDIT_STATUS"
const EDIT_STATUS_FAILED = "EDIT_STATUS_FAILED"
const DELETE_COURSE = "DELETE_COURSE"
const EDIT_COURSE = "EDIT_COURSE"
const EDIT_DETAILS_FAILED = "EDIT_DETAILS_FAILED"

let initialState = {
    courses: [],
    users: [],
    details: [],
    error: '',
    errors: []
}

const coursesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_COURSES:
            newState.error = '';
            newState.courses = action.courses;
            return newState;
        case LOAD_USERS:
            newState.error = '';
            newState.users = action.users;
            return newState;
        case LOAD_DETAILS:
            newState.error = '';
            newState.details = action.details;
            return newState;
        case EDIT_STATUS_FAILED:
            newState.error = action.error;
            return newState;
        case EDIT_DETAILS_FAILED:
            newState.errors = action.errors;
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

export function loadDetailsActionCreator(details) {
    return {type: LOAD_DETAILS, details: details}
}

export function editCourseStatusActionCreator(data) {
    console.log(data);
    if(data.status === 200)
        return {type: EDIT_STATUS}
    else
        return {type: EDIT_STATUS_FAILED, error: data.error}
}

export function deleteCourseActionCreator() {
    return {type: DELETE_COURSE}
}

export function editCourseDetailsActionCreator(data) {
    if(data.status === 200)
        return {type: EDIT_COURSE}
    else
        return {type: EDIT_DETAILS_FAILED, errors: data.errors}
}

export function createNotificationsActionCreator(data) {
    if(data.status === 200)
        return {type: EDIT_COURSE}
    else
        return {type: EDIT_DETAILS_FAILED, errors: data.errors}
}

export function addTeacherToCourseActionCreator(data) {
    if(data.status === 200)
        return {type: EDIT_COURSE}
    else
        return {type: EDIT_DETAILS_FAILED, errors: data.errors}
}

export function getMyCoursesActionCreator(courses) {
    return {type: LOAD_COURSES, courses : courses}
}

export function getTeachingCoursesActionCreator(courses) {
    return {type: LOAD_COURSES, courses : courses}
}

export function signUpFailedActionCreator(errors) {
    return {type: EDIT_DETAILS_FAILED, errors : errors}
}

export function editStatusStudentActionCreator(errors) {
    return {type: EDIT_DETAILS_FAILED, errors : errors}
}

export function editMarkStudentActionCreator(errors) {
    return {type: EDIT_DETAILS_FAILED, errors : errors}
}

export const editMarkStudentThunkCreator = (token, idCourse, idStudent, markType, mark) => (dispatch) => {
    return coursesAPI.editMarksStudent(token, idCourse, idStudent, markType, mark).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                return Promise.resolve();
            }
            dispatch(editMarkStudentActionCreator(data.errors));
            return Promise.reject();
        }
    );
};

export const editStatusStudentThunkCreator = (token, idCourse, idStudent, status) => (dispatch) => {
    return coursesAPI.editStatusStudent(token, idCourse, idStudent, status).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                return Promise.resolve();
            }
            dispatch(editStatusStudentActionCreator(data.errors));
            return Promise.reject();
        }
    );
};

export const signUpToCourseThunkCreator = (token, id) => (dispatch) => {
    return coursesAPI.signUpToCourse(token, id).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                return Promise.resolve();
            }
            signUpFailedActionCreator(data.errors);
            return Promise.reject();
        }
    );
};

export const getTeachingCoursesThunkCreator = (token) => (dispatch) => {
    return coursesAPI.getTeachingCourses(token).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                dispatch(getTeachingCoursesActionCreator(data.courses));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const getMyCoursesThunkCreator = (token) => (dispatch) => {
    return coursesAPI.getMyCourses(token).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                dispatch(getMyCoursesActionCreator(data.courses));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const addTeacherToCourseThunkCreator = (token, id, teacherId) => (dispatch) => {
    return coursesAPI.addTeacherToCourse(token, id, teacherId).then(
        (data) => {
            dispatch(addTeacherToCourseActionCreator(data));
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const createNotificationsThunkCreator = (token, id, isImportant, text) => (dispatch) => {
    return coursesAPI.createNotifications(token, id, isImportant, text).then(
        (data) => {
            dispatch(createNotificationsActionCreator(data));
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const editCourseDetailsThunkCreator = (token, id, requirements, annotations) => (dispatch) => {
    return coursesAPI.editCourseDetails(token, id, requirements, annotations).then(
        (data) => {
            dispatch(editCourseDetailsActionCreator(data));
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const deleteCourseThunkCreator = (token, id) => (dispatch) => {
    return coursesAPI.deleteCourse(token, id).then(
        (data) => {
            dispatch(deleteCourseActionCreator());
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export const editCourseStatusThunkCreator = (token, id, status) => (dispatch) => {
    return coursesAPI.editCourseStatus(token, id, status).then(
        (data) => {
            dispatch(editCourseStatusActionCreator(data));
            if(data.status === 200) {
                return Promise.resolve();
            }
            return Promise.reject(data.error);
        }
    );
};

export const loadDetailsThunkCreator = (token, id) => (dispatch) => {
    return coursesAPI.getCourseDetails(token, id).then(
        (data) => {
            if(data.status === 200) {
                dispatch(loadDetailsActionCreator(data.details));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

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