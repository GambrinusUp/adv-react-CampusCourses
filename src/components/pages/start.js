import Navbar from "../UI/navbar";
import React from "react";

const Start = () => {
    return (
        <div style={{backgroundColor: "#EBF5EE", width: "100%", height: "1000px"}}>
            <Navbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: "46px" }}>
                Добро пожаловать в систему кампусных курсов
            </div>
        </div>
    );
};

export default Start;