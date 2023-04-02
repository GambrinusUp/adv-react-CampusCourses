import axios from "axios";

const API_URL = 'https://camp-courses.api.kreosoft.space/';

function login(email, password){
    return axios.post(API_URL + "login", {
        email: email,
        password: password
    })
        .then((response) => {
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            return JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error.response.status);
            localStorage.setItem("user", '');
            return error;
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
    logout : logout
}