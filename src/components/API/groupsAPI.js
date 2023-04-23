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

export const groupsAPI = {
    getGroups : getGroups
}