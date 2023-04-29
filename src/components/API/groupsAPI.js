import axios from "axios";

const API_URL = 'https://camp-courses.api.kreosoft.space/';

function getGroups(token) {
    return axios.get(API_URL + "groups", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            if(response.status === 200)
                return response.data;
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response.status);
            return '';
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
            console.log(response);
            console.log(response.data);
            if(response.status === 200)
                return response.data;
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response.status);
            return '';
        });
}

function deleteGroups(token, id) {
    return axios.delete(API_URL + "groups/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            if(response.status === 200)
                return response.status;
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response.status);
            return '';
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
            console.log(response);
            console.log(response.data);
            if(response.status === 200)
                return response.data;
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response.status);
            return '';
        })
}

export const groupsAPI = {
    getGroups : getGroups,
    addGroups : addGroups,
    deleteGroups : deleteGroups,
    editGroups : editGroups
}