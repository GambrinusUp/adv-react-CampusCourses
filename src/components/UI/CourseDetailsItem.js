import {Button, List, message, Modal, Radio} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    editCourseStatusThunkCreator,
    loadDetailsThunkCreator,
    signUpToCourseThunkCreator
} from "../store/coursesReducer";

function CourseDetailsItem(props) {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.authorizePage.isAdmin);
    const isTeacher = useSelector((state) => state.authorizePage.isTeacher);
    const error = useSelector((state) => state.coursesPage.error);
    const [value, setValue] = useState(props.status);
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [errorShown, setErrorShown] = useState(false);

    const errors = useSelector((state) => state.coursesPage.errors)

    const statusColors = {
        'Created': '#000000',
        'OpenForAssigning': '#008958',
        'Started': '#826D9C',
        'Finished': '#DF8280'
    };

    const signUpToCourse = () => {
        const token = localStorage.getItem("token");
        dispatch(signUpToCourseThunkCreator(token, props.id)).then(() => {
            success("Signed up to course");

        }).catch(() => {
            console.log(errors);
            warning("Error")
        });
    }

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handleOk = () => {
        console.log(value);
        const token = localStorage.getItem("token");
        if(value !== '' && value !== undefined && value !== 'Created') {
            dispatch(editCourseStatusThunkCreator(token, props.id, value)).then(() => {
                success("Status edited");
                dispatch(loadDetailsThunkCreator(token, props.id));
            })
                .catch(() => {
                    setErrorShown(false);
                });
            setOpen(false);
        }
        else {
            warning("Choose status of course")
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const warning = (error) => {
        messageApi.open({
            type: 'warning',
            content: error,
        });
    };

    useEffect(() => {
        if (error !== '' && !errorShown) {
            setErrorShown(true);
            warning(error);
        }
    }, [dispatch, error, warning, errorShown, errors]);

    return(
        <>
            {contextHolder}
            <List bordered size="large" style={{marginTop:20}} id={props.id}>
                <List.Item style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div style={{fontWeight:"bold"}}>
                        Статус курса
                        <div style={{fontWeight:"400", color:statusColors[props.status]}}>
                            {props.status}
                        </div>
                    </div>
                    <div>
                        {(isAdmin || (isTeacher && props.teachers && props.teachers.some(teacher => teacher.email === localStorage.getItem("user")))) && (<Button type="primary" style={{marginRight: "10px", backgroundColor:"#EEE8A9", color: "#283044"}}
                                                                                                                                                                  onClick={() => setOpen(true)}>Изменить</Button>)}
                        { (props.status === 'OpenForAssigning')
                            && (props.showButton && !props.showButton.some(student => student.email === localStorage.getItem("user")))
                            && (props.teachers && !props.teachers.some(teacher => teacher.email === localStorage.getItem("user")))
                            && (<Button type="primary" style={{marginRight: "10px", backgroundColor:"#0FB17D", color: "#FFFFFF"}}
                                        onClick={signUpToCourse}>Записаться на курс</Button>)}
                    </div>
                </List.Item>
                <List.Item>
                    <div style={{ width: "50%" }}>
                        <div style={{fontWeight:"bold"}}>
                            Учебный год
                            <div style={{fontWeight:"400"}}>
                                {props.startYear}-{props.startYear + 1}
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "50%" }}>
                        <div style={{fontWeight:"bold"}}>
                            Семестр
                            <div style={{fontWeight:"400"}}>
                                {props.semester}
                            </div>
                        </div>
                    </div>
                </List.Item>
                <List.Item>
                    <div style={{ width: "50%" }}>
                        <div style={{fontWeight:"bold"}}>
                            Всего мест
                            <div style={{fontWeight:"400"}}>
                                {props.allPlaces}
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "50%" }}>
                        <div style={{fontWeight:"bold"}}>
                            Студентов зачислено
                            <div style={{fontWeight:"400"}}>
                                {props.studentsEnrolledCount}
                            </div>
                        </div>
                    </div>
                </List.Item>
                <List.Item>
                    <div style={{fontWeight:"bold"}}>
                        Заявок на рассмотрении
                        <div style={{fontWeight:"400"}}>
                            {props.studentsInQueueCount}
                        </div>
                    </div>
                </List.Item>
            </List>
            {(isAdmin || isTeacher) && (<Modal
                title="Изменение статуса курса"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
            >
                <Radio.Group onChange={onChange} value={value}
                             style={{color: "#FFFFFF"}}>
                    <Radio style={{color: "#FFFFFF"}} value={'OpenForAssigning'}>Открыт для записи</Radio>
                    <Radio style={{color: "#FFFFFF"}} value={'Started'}>В процессе</Radio>
                    <Radio style={{color: "#FFFFFF"}} value={'Finished'}>Завершен</Radio>
                </Radio.Group>
            </Modal>)}
        </>
    )
}

export default CourseDetailsItem;