import React from 'react';
import Navbar from "../UI/navbar";
import {Card, DatePicker} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const Registration = () => {
    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <div style={{backgroundColor: "#EBF5EE", width: "100%", height: "1000px"}}>
            <Navbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Card
                    style={{
                        width: 1400,
                        height: 800,
                        backgroundColor: "#78A1BB",
                        borderRadius: "20px"
                    }}
                >
                    <div style={{
                        fontStyle: "normal",
                        fontSize: "64px",
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
                                style={{paddingTop: "30px", width: "1200px"}}
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
                                style={{paddingTop: "30px"}}
                            >
                                <DatePicker
                                    prefix={<LockOutlined className="site-form-item-icon" style={{ fontSize: '20px'}} />}
                                    type="date"
                                    placeholder="Date"
                                    style={{ height: "50px", width: "1200px" }}
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
                                style={{paddingTop: "30px", width: "1200px"}}
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
                                style={{paddingTop: "30px"}}
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
                                style={{paddingTop: "30px"}}
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

export default Registration;