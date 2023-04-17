import axios from "axios";

const API_URL = 'https://camp-courses.api.kreosoft.space/';

function login(email, password) {
    return axios.post(API_URL + "login", {
        email: email,
        password: password
    })
        .then((response) => {
            console.log(response.data.token);
            localStorage.setItem("user", response.data.token);
            return response.data.token;
        })
        .catch((error) => {
            console.log(error.response.status);
            localStorage.setItem("user", '');
            return '';
        });
}

function registration(fullName, birthDate, email, password, confirmPassword) {
    return axios.post(API_URL + "registration", {
        fullName: fullName,
        birthDate: birthDate,
        email: email,
        password: password,
        confirmPassword
    })
        .then((response) => {
            console.log(response);
            console.log(response.data.token);
            localStorage.setItem("user", response.data.token);
            return response.data.token;
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response.status);
            localStorage.setItem("user", '');
            return '';
        });
}

function logout() {
    localStorage.removeItem("user");
    console.log('logout');
}

/*function register() {

}*/

export const authorizeAPI = {
    login : login,
    logout : logout,
    registration : registration
}