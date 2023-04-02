import React from 'react';
import {Link} from "react-router-dom";

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
        paddingRight: '10px'
    }
};

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.navbar_title}>Кампусные курсы</div>
            <div>
                <Link to="/registration" style={styles.navbar_text}>Регистрация</Link>
                <Link to="/authorization" style={styles.navbar_text}>Вход</Link>
            </div>
        </nav>
    );
};

export default Navbar;