import axios from "axios";

const API_URL = 'https://camp-courses.api.kreosoft.space/';

function login(email, password) {
    return axios.post(API_URL + "login", {
        email: email,
        password: password
    })
        .then((response) => {
            //console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
            return response.data.token;
        })
        .catch((error) => {
            //console.log(error.response.status);
            localStorage.setItem("token", '');
            return '';
        });
}

function registration(fullName, birthDate, email, password, confirmPassword) {
    return axios.post(API_URL + "registration", {
        fullName: fullName,
        birthDate: birthDate,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    })
        .then((response) => {
            /*console.log(response);
            console.log(response.data.token);*/
            localStorage.setItem("token", response.data.token);
            return response.data.token;
        })
        .catch((error) => {
            /*console.log(error);
            console.log(error.response.status);*/
            localStorage.setItem("token", '');
            return '';
        });
}

function logout(token) {
    /*localStorage.removeItem("token");
    console.log('logout');*/

    return axios.post(API_URL + "logout", null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            /*console.log(response);
            console.log(response.data);
            localStorage.setItem("token", '');*/
            return response.status;
        })
        .catch((error) => {
            /*console.log(error);
            console.log(error.response.status);*/
            return error.response.status;
        });
}

function role(token) {
    return axios.get(API_URL + "roles", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            /*console.log(response);
            console.log(response.data);*/
            return response.data;
        })
        .catch((error) => {
            /*console.log(error);
            console.log(error.response.status);*/
            return '';
        });
}

function profile(token) {
    return axios.get(API_URL + "profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            /*console.log(response);
            console.log(response.data);*/
            return response.data;
        })
        .catch((error) => {
            /*console.log(error);
            console.log(error.response.status);*/
            return '';
        });
}

/*function register() {

}*/

export const authorizeAPI = {
    login : login,
    logout : logout,
    registration : registration,
    role : role,
    profile : profile
}