import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Input, Form, DatePicker, Button, Card} from "antd";
import {MailOutlined, UserOutlined} from "@ant-design/icons";
import {getProfile} from "../store/authorizeReducer";
import {useForm} from "antd/es/form/Form";
import moment from "moment";
//import moment from 'moment';

const Profile = () => {
    const fullName = useSelector(state => state.authorizePage.fullName);
    const email = useSelector(state => state.authorizePage.email);
    const date = useSelector(state => state.authorizePage.birthDate);
    const dispatch = useDispatch();
    const [form] = useForm();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null && token !== '') {
            dispatch(getProfile(token))
                .then(() => {
                    let dateMoment = moment(date, 'YYYY-MM-DD');
                    console.log("Logged in successfully");
                    console.log(fullName, email);
                    form.setFieldsValue({fullName: fullName, email: email, birthday: dateMoment});
                })
                .catch(() => {
                    console.log("Failed to login");
                });
        } else {
            console.log("Failed to login");
        }
    }, [dispatch, email, form, fullName, date]);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log(moment(values.birthday).format('YYYY-MM-DD'))
    };
    return (
        <div style={{backgroundColor: "#EBF5EE", width: "100%", height: "1000px"}}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: "46px" }}>
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
                        }}>Профиль{fullName}</div>
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
                        style={{minWidth: 800, width: "100%", paddingTop: "30px"}}
                    >
                        <Input  prefix={<UserOutlined style={{ fontSize: '20px'}} />} placeholder="Name" style={{ height: "50px" }}/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Пожалуйста, введите Email' }]}
                        style={{minWidth: 800, width: "100%", paddingTop: "30px"}}
                    >
                        <Input type="email" disabled={true} prefix={<MailOutlined style={{ fontSize: '20px'}} />} placeholder="Email" style={{ height: "50px" }}/>
                    </Form.Item>
                    <Form.Item
                        name="birthday"
                        rules={[{ required: true, message: 'Пожалуйста, выберите дату рождения' }]}
                        style={{minWidth: 800, width: "100%", paddingTop: "30px"}}
                    >
                        <DatePicker style={{ width: '100%', height: "50px" }} format={'YYYY-MM-DD'} />
                    </Form.Item>
                    <Form.Item style={{paddingTop: "40px"}}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{backgroundColor: "#BFA89E",
                            width: "160px",
                            height: "50px",
                            fontSize: "20px"}}>
                            Change
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