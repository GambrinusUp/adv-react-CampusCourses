import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Input, Form, DatePicker, Button, Card, message} from "antd";
import {MailOutlined, UserOutlined} from "@ant-design/icons";
import {editProfile, getProfile} from "../store/authorizeReducer";
import {useForm} from "antd/es/form/Form";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import styles from './style.module.css'

const Profile = () => {
    const fullName = useSelector(state => state.authorizePage.fullName);
    const email = useSelector(state => state.authorizePage.email);
    const date = useSelector(state => state.authorizePage.birthDate);
    const dispatch = useDispatch();
    const [form] = useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const errors = useSelector((state) => state.authorizePage.errors);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const warning = (error) => {
        messageApi.open({
            type: 'warning',
            content: error,
        });
    };

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null || token !== '') {
            dispatch(getProfile(token))
                .then(() => {
                    let dateMoment = moment(date, 'YYYY-MM-DD');
                    form.setFieldsValue({fullName: fullName, email: email, birthday: dateMoment});
                })
                .catch(() => {
                    navigate('/', {replace: true});
                    console.log("Failed to login");
                });
        } else {
            navigate('/', {replace: true});
            console.log("Failed to login");
        }
        if (Object.keys(errors).length > 0) {
            console.log("Errors:", errors);
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    warning(errors[key]);
                    console.log(errors[key]);
                }
            }
        }
    }, [dispatch, email, form, fullName, date, navigate, errors, warning]);
    
    const onFinish = (values) => {
        const token = localStorage.getItem("token");
        console.log('Received values of form: ', values);
        dispatch(editProfile(token, values.fullName, values.birthday.format('YYYY-MM-DD')))
            .then(() => {
                success("Edit success")
                console.log("Edit success");
                })
            .catch(() => {
                console.log("Failed to edit");
            });
    };
    
    return (
        <div className={styles.container}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: "46px" }}>
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
                    <div style={{ display:"flex", textAlign: "center", justifyContent: "center"}}>
                <Form
                    form={form}
                    name="profile-form"
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <div style={{
                            paddingTop: 50,
                            fontStyle: "normal",
                            fontSize: "60px",
                            display: "flex",
                            justifyContent: "center",
                            color: "#FFFFFF"
                        }}>Профиль</div>
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
                        style={{minWidth: 800, width: "100%", paddingTop: "30px"}}
                    >
                        <Input  prefix={<UserOutlined style={{ fontSize: '20px'}} />}
                                placeholder="Name"
                                style={{ height: "50px" }}/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Пожалуйста, введите Email' }]}
                        style={{minWidth: 800, width: "100%", paddingTop: "30px"}}
                    >
                        <Input type="email"
                               disabled={true}
                               prefix={<MailOutlined style={{ fontSize: '20px'}} />}
                               placeholder="Email"
                               style={{ height: "50px" }}/>
                    </Form.Item>
                    <Form.Item
                        name="birthday"
                        rules={[{ required: true, message: 'Пожалуйста, выберите дату рождения' }]}
                        style={{minWidth: 800, width: "100%", paddingTop: "30px"}}
                    >
                        <DatePicker style={{ width: '100%', height: "50px" }}
                                    format={'YYYY-MM-DD'} />
                    </Form.Item>
                    <Form.Item style={{paddingTop: "40px"}}>
                        <Button type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{backgroundColor: "#BFA89E",
                                width: "160px",
                                height: "50px",
                                fontSize: "20px"}}>
                                Изменить
                        </Button>
                    </Form.Item>
                </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;