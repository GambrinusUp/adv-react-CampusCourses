import React, {useEffect} from 'react';
import {Card, message} from "antd";
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/authorizeReducer";
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css'

const Authorization = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const errors = useSelector((state) => state.authorizePage.errors);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const warning = (error) => {
        messageApi.open({
            type: 'warning',
            content: error,
        });
    };

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
        <div className={styles.container}>
            <div className={styles.cardDeck}>
                {contextHolder}
                <Card className={styles.authCard}>
                    <div className={styles.title}>Авторизация</div>
                    <div className={styles.authFormContainer}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                                className={styles.authFormItem}>
                                <Input prefix={<MailOutlined style={{ fontSize: '20px'}} />}
                                       placeholder="Email"
                                       style={{ height: "50px" }}/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                                className={styles.authFormItem}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"
                                                          style={{ fontSize: '20px'}} />}
                                    type="password"
                                    placeholder="Password"
                                    style={{ height: "50px" }}/>
                            </Form.Item>
                            <Form.Item
                                className={styles.authFormItem}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    style={{backgroundColor: "#BFA89E",
                                    width: "160px",
                                    height: "50px",
                                    fontSize: "20px"}}>
                                Войти
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
