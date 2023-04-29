import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserRole, logout} from "../store/authorizeReducer";

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
        textDecoration: 'none',
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
    const token = useSelector(state => state.authorizePage.token)
    const isTeacher = useSelector(state => state.authorizePage.isTeacher)
    const isStudent = useSelector(state => state.authorizePage.isStudent)
    const isAdmin = useSelector(state => state.authorizePage.isAdmin)
    useEffect(() => {
        //console.log(userEmail);
        console.log("rendering");
        let token = localStorage.getItem("token");
        if (token !== null && token !== '') {
            setIsLoggedIn(true);
            dispatch(getUserRole(token)).catch(() => {
                console.log("Failed to login");
                localStorage.setItem("token", '');
            });
        } else {
            setIsLoggedIn(false);
        }
    }, [dispatch, userEmail, token, isTeacher, isStudent, isAdmin]);
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
            <div style={styles.navbar_title}>
                <Link style={styles.navbar_title} to="/">Кампусные курсы</Link>
                {isLoggedIn && (
                    <>
                        <Link to="/groups" style={styles.navbar_text_after_title}>Группы курсов</Link>
                    </>
                )}
                {isLoggedIn && isStudent && !isAdmin && (
                    <>
                        <Link to="/groups" style={styles.navbar_text_after_title}>Мои курсы</Link>
                    </>
                )}
                {isLoggedIn && isTeacher && !isAdmin && (
                    <>
                        <Link to="/groups" style={styles.navbar_text_after_title}>Преподаваемые курсы</Link>
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
                        <Link to="/profile" style={styles.navbar_text}>{localStorage.getItem("user")}</Link>
                        <div style={styles.navbar_text} onClick={logoutUser}>Выход</div>
                    </>
                    )}
            </div>
        </nav>
    );
};


export default Navbar;