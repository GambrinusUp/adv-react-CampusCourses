import {Badge, Button, Input, List, message, Modal, Popconfirm, Radio, Select, Tabs} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import CourseDetailsItem from "../UI/CourseDetailsItem";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    addTeacherToCourseThunkCreator,
    createNotificationsThunkCreator,
    deleteCourseThunkCreator,
    editCourseDetailsThunkCreator, editMarkStudentThunkCreator, editStatusStudentThunkCreator,
    loadDetailsThunkCreator, loadUsersThunkCreator
} from "../store/coursesReducer";
import {useDispatch, useSelector} from "react-redux";
import ReactQuill from "react-quill";
import styles from './style.module.css'

function Course() {
    const details = useSelector((state) => state.coursesPage.details);
    const errors = useSelector((state) => state.coursesPage.errors);
    const isAdmin = useSelector((state) => state.authorizePage.isAdmin);
    const isTeacher = useSelector((state) => state.authorizePage.isTeacher);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { TabPane } = Tabs;
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const users = useSelector((state) => state.coursesPage.users);
    const [editVisible, setEditVisible] = useState(false);
    const [requirements, setRequirements] = useState('');
    const [annotations, setAnnotations] = useState('');
    const [notification, setNotification] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [teacherVisible, setTeacherVisible] = useState(false);
    const [studentVisible, setStudentVisible] = useState(false);
    const [teacher, setTeacher] = useState('');
    const [student, setStudent] = useState('');
    const [mark, setMark] = useState('Passed')
    const [markType, setMarkType] = useState('');
    const [studentId, setStudentId] = useState('');

    const statusColors = {
        'Accepted': '#0FB17D',
        'InQueue': '#826D9C',
        'Declined': '#DF8280'
    };

    const statusResultColors = {
        'NotDefined': '#A9A9A9',
        'Passed': '#0FB17D',
        'Failed': '#DF8280'
    };

    const options = users.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
    }));

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['link', 'image', 'video', 'formula'],
            ['clean']
        ]
    };

    const changeMarkStudent = () => {
        const token = localStorage.getItem("token");
        console.log(id, student, mark, markType, studentId);
        dispatch(editMarkStudentThunkCreator(token, id, studentId, markType, mark)).then(() => {
            success("Mark changed");
            dispatch(loadDetailsThunkCreator(token, id));
        });
        setStudentVisible(false);
    }

    const changeStatusStudent = (idStudent, status) => {
        console.log(idStudent, status);
        const token = localStorage.getItem("token");
        dispatch(editStatusStudentThunkCreator(token, id, idStudent, status)).then(() => {
            success("Status changed");
            dispatch(loadDetailsThunkCreator(token, id));
        });
    }

    const onChangeSelect = (value) => {
        setTeacher(value);
        console.log(`selected ${value}`);
    };

    const handleAddTeacherOk = () => {
        if(teacher !== '') {
            console.log(teacher);
            const token = localStorage.getItem("token");
            dispatch(addTeacherToCourseThunkCreator(token, id, teacher)).then(() => {
                success("Teacher added");
                dispatch(loadDetailsThunkCreator(token, id));
            });
        } else {
            warning("Choose a teacher");
        }
        setTeacher('');
        setTeacherVisible(false);
    };

    const handleEditNotification = () => {
        const token = localStorage.getItem("token");
        console.log(notification, notificationText);
        dispatch(createNotificationsThunkCreator(token, id, notification, notificationText)).then(() => {
            success("Notification created");
            dispatch(loadDetailsThunkCreator(token, id));
        });
        setNotificationVisible(false);
    };

    const onChangeMark = (e) => {
        setMark(e.target.value);
    }

    const onChangeNotification = (e) => {
        console.log('radio checked', e.target.value);
        setNotification(e.target.value);
    };

    const handleEditOk = () => {
        const token = localStorage.getItem("token");
        dispatch(editCourseDetailsThunkCreator(token, id, requirements, annotations)).then(() => {
            success("Details changed");
            console.log("success");
            dispatch(loadDetailsThunkCreator(token, id));
        });
        setEditVisible(false);
    };

    const handleCancel = () => {
        setEditVisible(false);
        setNotificationVisible(false);
        setTeacherVisible(false);
        setStudentVisible(false);
    };

    const deleteCourse = () => {
        const token = localStorage.getItem("token");
        dispatch(deleteCourseThunkCreator(token, id)).then(() => {
            success("Course deleted");
            setTimeout(() => {
                navigate(-1);
            }, 500);
        })
    }

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
        const token = localStorage.getItem("token");
        dispatch(loadDetailsThunkCreator(token, id)).then(() => {
            if(isTeacher || isAdmin)
                dispatch(loadUsersThunkCreator(token)).then(() => {console.log(1)});
        }).catch(() => {
            navigate('/', {replace: true});
        });
        if (Object.keys(errors).length > 0) {
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    warning(errors[key]);
                }
            }
        }
    }, [dispatch, errors, id, navigate]);


    return (
        <div className={styles.container2}>
            <div className={styles.cardDeck}>
                {contextHolder}
                <div className={styles.details}>
                    <div className={styles.title2}>
                        {details.name}
                    </div>
                    <div className={styles.titleBetween}>
                        Основные данные курса
                        {(isAdmin || (isTeacher && details && details.teachers &&
                            details.teachers.some(teacher => teacher.email === localStorage.getItem("user"))))
                            && (<div>
                            {isAdmin && (
                                <Popconfirm
                                    title="Вы хотите удалить курс?"
                                    onConfirm={deleteCourse}
                                    okText="Да"
                                    cancelText="Нет">
                                    <Button
                                        type="primary"
                                        style={{marginRight: "10px", backgroundColor:"#DF8280", color: "#283044"}}>
                                        Удалить курс
                                    </Button>
                                </Popconfirm>
                            )}
                            <Button
                                type="primary"
                                style={{marginRight: "10px", backgroundColor:"#EEE8A9", color: "#283044"}}
                                onClick={() => {setEditVisible(true); setRequirements(details.requirements);
                                setAnnotations(details.annotations)}}>
                                Редактировать
                            </Button>
                        </div>)}
                    </div>
                    <CourseDetailsItem id={id}
                                       status={details.status}
                                       startYear={details.startYear}
                                       semester={details.semester}
                                       allPlaces={details.maximumStudentsCount}
                                       studentsEnrolledCount={details.studentsEnrolledCount}
                                       showButton={details.students}
                                       studentsInQueueCount={details.studentsInQueueCount}
                                       teachers={details.teachers}
                    />
                    <Tabs defaultActiveKey="1" centered style={{marginTop:20}}>
                        <TabPane tab="Требования к курсу" key="1">
                            <ReactQuill
                                value={details.requirements}
                                readOnly={true}
                                theme="snow"
                                modules={{
                                    toolbar: false
                                }}
                            />
                        </TabPane>
                        <TabPane tab="Аннотация" key="2">
                            <ReactQuill
                                value={details.annotations}
                                readOnly={true}
                                theme="snow"
                                modules={{
                                    toolbar: false
                                }}
                            />
                        </TabPane>
                        <TabPane tab={
                            <span style={{display:"flex", alignItems:"center"}}>
                                Уведомления
                                <Badge count={Object(details.notifications).length} style={{ marginLeft: 8 }} />
                            </span>}
                                 key="3">
                            {(isAdmin || (isTeacher && details && details.teachers &&
                                details.teachers.some(teacher => teacher.email === localStorage.getItem("user"))))
                                && (<Button onClick={() => {setNotificationVisible(true)}}
                                            icon={<PlusOutlined/>}
                                            type="primary">
                                Создать уведомление
                            </Button>)}
                            <List
                                style={{marginTop: "20px"}}
                                size="large"
                                dataSource={details.notifications}
                                renderItem={(item) => (
                                    <List.Item
                                        style={{backgroundColor: item.isImportant ? "rgb(255,0,0, 0.1)" : "transparent"}}>
                                        {item.text}
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                    <Tabs defaultActiveKey="1" centered style={{marginTop:20, paddingBottom:10}}>
                        <TabPane tab="Преподаватели" key="1">
                            {isAdmin && (<Button icon={<PlusOutlined />} type="primary" onClick={() => {
                                setTeacherVisible(true);
                            }}>
                                Добавить преподавателя
                            </Button>)}
                            <List
                                style={{marginTop: "20px"}}
                                size="large"
                                dataSource={details.teachers}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div>
                                            {item.name + ' '}
                                            {item.isMain && (
                                                <>
                                                    <Badge text={"основной"} style={{color: "green"}} color={"green"}/>
                                                </>
                                            )}
                                        </div>
                                        {item.email}
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="Студенты" key="2">
                            <List
                                style={{marginTop: "20px"}}
                                size="large"
                                dataSource={details.students}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div style={{ width: "34%" }}>
                                            <div>
                                                {item.name}
                                            </div>
                                            <div>
                                                Статус - <span style={{color:statusColors[item.status]}}>{item.status}</span>
                                            </div>
                                            <div>
                                                {item.email}
                                            </div>
                                        </div>
                                        {(isAdmin || (isTeacher && details && details.teachers
                                            && details.teachers.some(teacher => teacher.email === localStorage.getItem("user")))
                                            || item.email === localStorage.getItem("user")) && (
                                            <>
                                                <div style={{ width: "33%" }}>
                                                    {item.status === 'Accepted' && (
                                                        <>
                                                            {(isAdmin || (isTeacher && details && details.teachers
                                                                && details.teachers.some(teacher => teacher.email === localStorage.getItem("user")))) ? (
                                                                <a href="#" onClick={(event) => { event.preventDefault();
                                                                setMarkType('Midterm'); setStudentVisible(true);
                                                                setStudent(item.name); setStudentId(item.id);}}>
                                                                    {'Промежуточная аттестация - '}
                                                                </a>
                                                            ) : (
                                                                <>
                                                                    {'Промежуточная аттестация - '}
                                                                </>
                                                            )}
                                                            <Button size="small" type="text"
                                                                    style={{fontSize: '12px', backgroundColor: statusResultColors[item.midtermResult],
                                                                color: '#fff', border: 'none', cursor: 'default' }}>
                                                                {item.midtermResult}
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                                <div style={{ width: "33%" }}>
                                                    {item.status === 'Accepted' && (
                                                        <>
                                                            {(isAdmin || (isTeacher && details && details.teachers
                                                                && details.teachers.some(teacher => teacher.email === localStorage.getItem("user")))) ? (
                                                                <a href="#" onClick={(event) => { event.preventDefault();
                                                                    setMarkType('Final'); setStudentVisible(true);
                                                                    setStudent(item.name);setStudentId(item.id);}}>
                                                                    {'Финальная аттестация - '}
                                                                </a>
                                                            ) : (
                                                                <>
                                                                    {'Финальная аттестация - '}
                                                                </>
                                                            )}
                                                            <Button size="small" type="text" style={{
                                                                fontSize: '12px',
                                                                backgroundColor: statusResultColors[item.finalResult],
                                                                color: '#fff',
                                                                border: 'none',
                                                                cursor: 'default'
                                                            }}>
                                                                {item.finalResult}
                                                            </Button>
                                                        </>
                                                    )}
                                                    {(isAdmin || (isTeacher && details && details.teachers
                                                        && details.teachers.some(teacher => teacher.email === localStorage.getItem("user"))))
                                                        && item.status === 'InQueue' && (
                                                        <>
                                                            <Button type="primary" style={{marginRight:"10px"}}
                                                            onClick={() => {changeStatusStudent(item.id, "Accepted")}}>принять</Button>
                                                            <Button type="primary" danger
                                                            onClick={() => {changeStatusStudent(item.id, "Declined")}}>отклонить заявку</Button>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <Modal
                    title="Редактирование курса"
                    centered
                    open={editVisible}
                    onOk={handleEditOk}
                    onCancel={handleCancel}
                    onChange={(e) => setEditVisible(e.target.value)}
                    width={700}
                    style={{color: "#FFFFFF"}}
                >
                    Требования
                    <ReactQuill
                        value={requirements}
                        onChange={setRequirements}
                        modules={modules}
                        placeholder="Введите требования"
                        style={{marginBottom: "10px", color:"black"}}
                    />
                    Аннотации
                    <ReactQuill
                        value={annotations}
                        onChange={setAnnotations}
                        modules={modules}
                        placeholder="Введите аннотации"
                        style={{marginBottom: "10px", color:"black"}}
                    />
                </Modal>
                <Modal
                    title="Создание уведомления"
                    centered
                    open={notificationVisible}
                    onOk={handleEditNotification}
                    onCancel={handleCancel}
                    onChange={(e) => setNotificationVisible(e.target.value)}
                    width={700}
                    style={{color: "#FFFFFF"}}
                >
                    Текст уведомления
                    <Input
                        value={notificationText}
                        placeholder="Текст уведомления"
                        onChange={(event) => setNotificationText(event.target.value)}
                        style={{marginBottom: "10px"}}
                    />
                    Важность
                    <div>
                        <Radio.Group onChange={onChangeNotification} value={notification}
                                     style={{color: "#FFFFFF"}}>
                            <Radio style={{color: "#FFFFFF"}} value={false}>Обычное</Radio>
                            <Radio style={{color: "#FFFFFF"}} value={true}>Важное</Radio>
                        </Radio.Group>
                    </div>
                </Modal>
                <Modal
                    title="Добавление преподавателя на курс"
                    centered
                    open={teacherVisible}
                    onOk={handleAddTeacherOk}
                    onCancel={handleCancel}
                    onChange={(e) => setTeacherVisible(e.target.value)}
                    width={700}
                    style={{color: "#FFFFFF"}}
                >
                    Выберите преподавателя
                    <div>
                        <Select
                            showSearch
                            placeholder="Выберите преподавателя"
                            optionFilterProp="children"
                            onChange={onChangeSelect}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={options}
                        />
                    </div>
                </Modal>
                <Modal
                    title={`Изменение оценки ${markType}`}
                    centered
                    open={studentVisible}
                    onOk={changeMarkStudent}
                    onCancel={handleCancel}
                    onChange={(e) => setStudentVisible(e.target.value)}
                    width={700}
                    style={{color: "#FFFFFF"}}
                >
                    Студент - {student}
                    <div>
                        <Radio.Group onChange={onChangeMark} value={mark}
                                     style={{color: "#FFFFFF"}}>
                            <Radio style={{color: "#FFFFFF"}} value={'Passed'}>Пройдено</Radio>
                            <Radio style={{color: "#FFFFFF"}} value={'Failed'}>Зафейлено</Radio>
                        </Radio.Group>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Course;