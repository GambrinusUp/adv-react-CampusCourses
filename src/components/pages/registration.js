import React from 'react';
import Navbar from "../UI/navbar";
import {Card, DatePicker} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import {login, logout, registration} from "../store/authorizeReducer";
import {connect, useDispatch} from "react-redux";
const dateFormat = 'YYYY-MM-DD';
const Registration = ({token}) => {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log(values.date.format(dateFormat));
        console.log(values);
        dispatch(registration(values.username, values.date.format(dateFormat) + 'T12:05:39.949Z', values.email, values.password1, values.password2))
            .then(() => {
                console.log("Logged in successfully");
                console.log(token);
            })
            .catch(() => {
                console.log("Failed to login");
                console.log(token);
            });
    };
    return (
        <div style={{backgroundColor: "#EBF5EE", width: "100%", height: "1000px"}}>
            <Navbar />
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
                        paddingTop: 40,
                        fontStyle: "normal",
                        fontSize: "60px",
                        display: "flex",
                        justifyContent: "center",
                        color: "#FFFFFF"
                    }}>Регистрация нового пользователя</div>
                    <div style={{ display:"flex", textAlign: "center", justifyContent: "center"}}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                                style={{paddingTop: "40px", minWidth: 800, width: "100%"}}
                            >
                                <Input prefix={<UserOutlined style={{ fontSize: '20px'}} />} placeholder="Name" style={{ height: "50px" }}/>
                            </Form.Item>
                            <Form.Item
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your birthdate!',
                                    },
                                ]}
                                style={{paddingTop: "20px"}}
                            >
                                <DatePicker
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ fontSize: '20px'}} />}
                                    type="date"
                                    format={dateFormat}
                                    placeholder="Date"
                                    style={{ height: "50px", minWidth: 800, width: "100%"}}
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                                style={{paddingTop: "20px", minWidth: 800, width: "100%"}}
                            >
                                <Input prefix={<MailOutlined style={{ fontSize: '20px'}} />} placeholder="Email" style={{ height: "50px" }}/>
                            </Form.Item>
                            <Form.Item
                                name="password1"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                                style={{paddingTop: "20px", minWidth: 800, width: "100%"}}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ fontSize: '20px'}} />}
                                    type="password"
                                    placeholder="Password"
                                    style={{ height: "50px" }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password2"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                                style={{paddingTop: "20px", minWidth: 800, width: "100%"}}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ fontSize: '20px'}} />}
                                    type="password"
                                    placeholder="Password"
                                    style={{ height: "50px" }}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{paddingTop: "20px", minWidth: 800, width: "100%"}}>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{backgroundColor: "#BFA89E",
                                    width: "160px",
                                    height: "50px",
                                    fontSize: "20px"}}>
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

//export default Registration;

function mapStateToProps(state) {
    return { token: state.authorizePage.token };
}

export default connect(mapStateToProps, {login, registration, logout})(Registration);