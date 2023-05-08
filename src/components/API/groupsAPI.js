import axios from "axios";

const API_URL = 'https://camp-courses.api.kreosoft.space/';

function getGroups(token) {
    return axios.get(API_URL + "groups", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return {status: response.status, groups: response.data};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function addGroups(token, name) {
    return axios.post(API_URL + "groups", {
        "name": name
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            return {status: response.status, group: response.data};
        })
        .catch((error) => {
            return {status: error.response.status}
        });
}

function deleteGroups(token, id) {
    return axios.delete(API_URL + "groups/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            return {status: response.status};
        })
        .catch((error) => {
            return {status: error.response.status}//, errors: [error.response.message]}
        });
}

function editGroups(token, name, id) {
    return axios.put(API_URL + "groups/" + id, {
        "name": name
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            return {status: response.status, group: response.data}
        })
        .catch((error) => {
            return {status: error.response.status}
        })
}

export const groupsAPI = {
    getGroups : getGroups,
    addGroups : addGroups,
    deleteGroups : deleteGroups,
    editGroups : editGroups,
}