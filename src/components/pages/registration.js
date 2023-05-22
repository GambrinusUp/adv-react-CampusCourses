import React, {useEffect} from 'react';
import {Card, DatePicker, message} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import {registration1} from "../store/authorizeReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
const dateFormat = 'YYYY-MM-DD';
const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errors = useSelector((state) => state.authorizePage.errors);
    const [messageApi, contextHolder] = message.useMessage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const warning = (error) => {
        messageApi.open({
            type: 'warning',
            content: error,
        });
    };

    const onFinish = (values) => {
        console.log(values.date.format(dateFormat));
        console.log(values);
        dispatch(registration1(values.username, values.date.format(dateFormat) + 'T12:05:39.949Z', values.email, values.password1, values.password2))
            .then(() => {
                console.log("Logged in successfully");
                navigate('/', {replace: true});
            })
            .catch(() => {
                console.log("Failed to login");
                console.log(errors);
            });
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log("Errors:", errors);
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    warning(errors[key]);
                    console.log(errors[key]);
                }
            }
        }
    }, [dispatch, errors, warning]);

    return (
        <div style={{backgroundColor: "#EBF5EE", width: "100%", height: "1000px"}}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                {contextHolder}
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
                                    height: "50px",
                                    fontSize: "20px"}}>
                                    Зарегистрироваться
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