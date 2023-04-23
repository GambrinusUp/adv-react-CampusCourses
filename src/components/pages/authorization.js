import React from 'react';
import {Card} from "antd";
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import {useDispatch} from "react-redux";
import {login} from "../store/authorizeReducer";
import { useNavigate } from 'react-router-dom';

const Authorization = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        const { email, password } = values;
        dispatch(login(email, password))
            .then(() => {
                let userToken = localStorage.getItem("token");
                if (userToken !== '' && userToken !== null){
                    navigate('/', {replace: true});
                }
            })
            .catch(() => {
                console.log("Failed to login");
            });
    };
    return (
        <div style={{backgroundColor: "#EBF5EE", width: "100%", height: "1000px"}}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Card
                    style={{
                        minWidth: 1000,
                        width: "70%",
                        height: 800,
                        backgroundColor: "#78A1BB",
                        borderRadius: "20px"
                    }}
                >
                    <div style={{
                        paddingTop: 50,
                        fontStyle: "normal",
                        fontSize: "60px",
                        display: "flex",
                        justifyContent: "center",
                        color: "#FFFFFF"
                    }}>Авторизация</div>
                    <div style={{ display:"flex", textAlign: "center", justifyContent: "center"}}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                                style={{paddingTop: "40px", minWidth: 800, width: "100%"}}
                            >
                                <Input prefix={<MailOutlined style={{ fontSize: '20px'}} />} placeholder="Email" style={{ height: "50px" }}/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                                style={{paddingTop: "40px", minWidth: 800, width: "100%"}}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ fontSize: '20px'}} />}
                                    type="password"
                                    placeholder="Password"
                                    style={{ height: "50px" }}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{paddingTop: "40px"}}>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{backgroundColor: "#BFA89E",
                                    width: "160px",
                                    height: "50px",
                                    fontSize: "20px"}}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
};


export default Authorization;


/*function mapStateToProps(state) {
    return { token: state.authorizePage.token };
}

export default connect(mapStateToProps, {login, logout})(Authorization);*/