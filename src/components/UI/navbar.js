import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserRole, logout} from "../store/authorizeReducer";

const styles = {    //сделать навбар закрепленным сверху
    navbar: {
        height: "60px",
        backgroundColor: "#283044",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "fixed",
        zIndex: 1
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
    const navigate = useNavigate();
    const isTeacher = useSelector(state => state.authorizePage.isTeacher)
    const isStudent = useSelector(state => state.authorizePage.isStudent)
    const isAdmin = useSelector(state => state.authorizePage.isAdmin)

    useEffect(() => {
        console.log("rendering");
        let token = localStorage.getItem("token");
        if (token !== null && token !== '') {
            setIsLoggedIn(true);
            dispatch(getUserRole(token)).catch(() => {
                localStorage.setItem("token", '');
                setIsLoggedIn(false);
                navigate('/', {replace: true});
            });
        } else {
            setIsLoggedIn(false);
        }
    }, [dispatch, isTeacher, isStudent, isAdmin, navigate]);

    const logoutUser = () => {
        let token = localStorage.getItem("token");
        if(token !== null) {
            dispatch(logout(token))
                .then(() => {
                    setIsLoggedIn(false);
                })
                .catch(() => {
                    setIsLoggedIn(false);
                });
        }
        navigate('/', {replace: true});
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
                {isLoggedIn && (
                    <>
                        <Link to="/courses/my" style={styles.navbar_text_after_title}>Мои курсы</Link>
                    </>
                )}
                {isLoggedIn && isTeacher && (
                    <>
                        <Link to="/courses/teaching" style={styles.navbar_text_after_title}>Преподаваемые курсы</Link>
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