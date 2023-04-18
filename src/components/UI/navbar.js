import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {login, logout, registration1} from "../store/authorizeReducer";

const styles = {
    navbar: {
        height: "60px",
        backgroundColor: "#283044",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "fixed"
    },
    navbar_title: {
        display: "flex",
        //fontFamily: "Inter",
        fontStyle: "normal",
        fontSize: "32px",
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: '10px'
    },
    navbar_text: {
        display: "inline-block",
        fontStyle: "normal",
        fontSize: "20px",
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: '10px',
        textDecoration: 'none',
        outline: 'none',
        paddingRight: '10px',
        cursor: "pointer"
    },
    navbar_text_after_title: {
        paddingLeft: "30px",
        display: "inline-block",
        fontStyle: "normal",
        fontSize: "20px",
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: '10px',
        textDecoration: 'none',
        outline: 'none',
        paddingRight: '10px'
    }
};

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const userEmail = useSelector(state => state.authorizePage.email)
    useEffect(() => {
        console.log(localStorage.getItem("token"));
        const token = localStorage.getItem("token");
        if (token !== null && token !== '') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    const logoutUser = () => {
        let token = localStorage.getItem("token");
        console.log(token);
        if(token !== null) {
            dispatch(logout(token))
                .then(() => {
                    setIsLoggedIn(false);
                    console.log("success");
                })
                .catch(() => {
                    console.log("error");
                });
        }
    };
    return (
        <nav style={styles.navbar}>
            <div style={styles.navbar_title}>Кампусные курсы
                {isLoggedIn && (
                    <>
                        <Link to="/registration" style={styles.navbar_text_after_title}>Группы курсов</Link>
                        <Link to="/authorization" style={styles.navbar_text}>Мои курсы</Link>
                    </>
                )}
            </div>
            <div>
                {!isLoggedIn && (
                    <>
                        <Link to="/registration" style={styles.navbar_text}>Регистрация</Link>
                        <Link to="/authorization" style={styles.navbar_text}>Вход</Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/profile" style={styles.navbar_text}>{userEmail}</Link>
                        <div style={styles.navbar_text} onClick={logoutUser}>Выход</div>
                    </>
                    )}
            </div>
        </nav>
    );
};

function mapStateToProps(state) {
    return { token: state.authorizePage.token };
}

export default connect(mapStateToProps, {login, registration1, logout})(Navbar);