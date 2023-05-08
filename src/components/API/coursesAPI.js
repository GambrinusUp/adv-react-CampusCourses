import axios from "axios";

const API_URL = 'https://camp-courses.api.kreosoft.space/';

function getListOfCourses(token, id) {
    return axios.get(API_URL + "groups/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, courses: response.data}
        })
        .catch((error) => {
            return {status: error.response.status}
        })
}

function getListOfUsers(token) {
    return axios.get(API_URL + "users", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log(response);
            return {status: response.status, users: response.data}
        })
        .catch((error) => {
            return {status: error.response.status}
        })
}

function createCourseOfGroup(token, id, name, startYear, maximumStudentsCount, semester, requirements, annotations, mainTeacherId) {
    return axios.post(API_URL + "courses/" + id, {
        "name": name,
        "startYear": startYear,
        "maximumStudentsCount": maximumStudentsCount,
        "semester": semester,
        "requirements": requirements,
        "annotations": annotations,
        "mainTeacherId": mainTeacherId
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log(response);
            return {status : response.status}
        })
        .catch((error) => {
            console.log(error);
            return {status : error.status}
        })
}

export const coursesAPI = {
    getListOfCourses : getListOfCourses,
    getListOfUsers : getListOfUsers,
    createCourseOfGroup : createCourseOfGroup
}