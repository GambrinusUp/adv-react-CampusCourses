import axios from "axios";

const API_URL = 'https://camp-courses.api.kreosoft.space/';

function login(email, password) {
    return axios.post(API_URL + "login", {
        email: email,
        password: password
    })
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            return {status: response.status, token: response.data.token};
        })
        .catch((error) => {
            console.log(error);
            localStorage.setItem("token", '');
            return {status: error.response.status, errors: [error.response.data.message]};
        });
}

function editProfile(token, fullName, birthDate) {
    return axios.put(API_URL + "profile", {
            "fullName": fullName,
            "birthDate": birthDate + "T18:38:36.191Z"
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return {status: response.status, profile: response.data}
        })
        .catch((error) => {
            console.log(error);
            if(error.response.status === 401) {
                localStorage.setItem("token", '');
                return {status: error.response.status, errors: [error.response.data.message]}
            }
            return {status: error.response.status, errors: error.response.data.errors};
        })
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
            localStorage.setItem("token", response.data.token);
            return {status: response.status, token: response.data.token};
        })
        .catch((error) => {
            localStorage.setItem("token", '');
            if(error.response.status === 409) {
                return {status: error.response.status, errors: [error.response.data.message]}
            }
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

function logout(token) {
    return axios.post(API_URL + "logout", null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.status;
        })
        .catch((error) => {
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
            console.log(response.data);
            return {status: response.status, role: response.data};
        })
        .catch((error) => {
            console.log(error);
            return {status: error.response.status, errors: [error.response.data.message]}
        });
}

function profile(token) {
    return axios.get(API_URL + "profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return {status: response.status, profile: response.data};
        })
        .catch((error) => {
            return {status: error.response.status, errors: [error.response.data.message]};
        });
}

export const authorizeAPI = {
    login : login,
    logout : logout,
    registration : registration,
    role : role,
    profile : profile,
    editProfile : editProfile
}