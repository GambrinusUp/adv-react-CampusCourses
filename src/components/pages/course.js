import {Badge, Button, Input, List, message, Modal, Radio, Tabs} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import CourseDetailsItem from "../UI/CourseDetailsItem";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    deleteCourseThunkCreator,
    editCourseDetailsThunkCreator,
    loadDetailsThunkCreator
} from "../store/coursesReducer";
import {useDispatch, useSelector} from "react-redux";

function Course() {
    const details = useSelector((state) => state.coursesPage.details);
    const errors = useSelector((state) => state.coursesPage.errors);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { TabPane } = Tabs;
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [editVisible, setEditVisible] = useState(false);
    const [requirements, setRequirements] = useState('');
    const [annotations, setAnnotations] = useState('');

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
    };

    const deleteCourse = () => {
        const token = localStorage.getItem("token");
        dispatch(deleteCourseThunkCreator(token, id)).then(() => {
            success("Course deleted");
            setTimeout(() => {
                navigate(-1);
            }, 500);
        })
        console.log('delete');
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
        console.log(id);
        const token = localStorage.getItem("token");
        dispatch(loadDetailsThunkCreator(token, id)).catch(() => {
            navigate('/', {replace: true});
        });
        console.log(errors);
        if (Object.keys(errors).length > 0) {
            console.log("Errors:", errors);
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    warning(errors[key]);
                    console.log(errors[key]);
                }
            }
        }
    }, [dispatch, errors, id, navigate]);

    return (
        <div style={{ backgroundColor: "#EBF5EE", width: "100%", minHeight: "1000px"}}>
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                {contextHolder}
                <div className="details" style={{minWidth: 600, width: "50vw"}}>
                    <div
                        style={{
                            paddingTop: 90,
                            fontStyle: "normal",
                            fontSize: "60px",
                            color: "#283044",
                            paddingBottom: 20
                        }}
                    >
                        Группы кампусных курсов
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        Основные данные курса
                        <div>
                            <Button type="primary" style={{marginRight: "10px", backgroundColor:"#DF8280", color: "#283044"}}
                            onClick={deleteCourse}>Удалить курс</Button>
                            <Button type="primary" style={{marginRight: "10px", backgroundColor:"#EEE8A9", color: "#283044"}}
                            onClick={() => {setEditVisible(true); setRequirements(details.requirements);
                                setAnnotations(details.annotations)}}>Редактировать</Button>
                        </div>
                    </div>
                    <CourseDetailsItem id={id} status={details.status} startYear={details.startYear} semester={details.semester}
                    allPlaces={details.maximumStudentsCount} studentsEnrolledCount={details.studentsEnrolledCount}
                                       studentsInQueueCount={details.studentsInQueueCount}/>
                    <Tabs defaultActiveKey="1" centered style={{marginTop:20}}>
                        <TabPane tab="Требования к курсу" key="1">
                            {details.requirements}
                        </TabPane>
                        <TabPane tab="Аннотация" key="2">
                            {details.annotations}
                        </TabPane>
                        <TabPane tab={
                            <span style={{display:"flex", alignItems:"center"}}>
                                Уведомления
                                <Badge count={Object(details.notifications).length} style={{ marginLeft: 8 }} />
                            </span>
                        } key="3">
                            <Button icon={<PlusOutlined />} type="primary">
                                Создать уведомление
                            </Button>
                            <List
                                style={{marginTop: "20px"}}
                                size="large"
                                dataSource={details.notifications}
                                renderItem={(item) => (
                                    <List.Item style={{backgroundColor: item.isImportant ? "rgb(255,0,0, 0.1)" : "transparent"}}>
                                        {item.text}
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                    <Tabs defaultActiveKey="1" centered style={{marginTop:20}}>
                        <TabPane tab="Преподаватели" key="1">
                            <Button icon={<PlusOutlined />} type="primary">
                                Добавить преподавателя
                            </Button>
                            <List
                                style={{marginTop: "20px"}}
                                size="large"
                                dataSource={details.teachers}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div>
                                            {item.name + ' '}
                                            {item.isMain ? (
                                                <>
                                                    <Badge text={"основной"} style={{color: "green"}} color={"green"}/>
                                                </>
                                            ) : (
                                                <>
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
                                        <div style={{ width: "33%" }}>
                                            {item.status === 'Accepted' ? (
                                                <>
                                                    <a href="#" onClick={(event) => { event.preventDefault();}}>
                                                        {'Промежуточная аттестация - '}
                                                    </a>
                                                    <Button size="small" type="text" style={{fontSize: '12px', backgroundColor: statusResultColors[item.midtermResult],
                                                        color: '#fff', border: 'none', cursor: 'default' }}>
                                                        {item.midtermResult}
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                        </div>
                                        <div style={{ width: "33%" }}>
                                            {item.status === 'Accepted' ? (
                                                <>
                                                    <a href="#" onClick={(event) => { event.preventDefault();}}>
                                                        {'Финальная аттестация - '}
                                                    </a>
                                                    <Button size="small" type="text" style={{fontSize: '12px', backgroundColor: statusResultColors[item.finalResult],
                                                        color: '#fff', border: 'none', cursor: 'default' }}>
                                                        {item.finalResult}
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                            {item.status === 'InQueue' ? (
                                                <>
                                                    <Button type="primary" danger>принять</Button>
                                                    <Button type="primary">отклонить заявку</Button>
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                        </div>
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
                    <Input
                        value={requirements}
                        placeholder="Введите требования"
                        onChange={(event) => setRequirements(event.target.value)}
                        style={{marginBottom: "10px"}}
                    />
                    Аннотации
                    <Input
                        value={annotations}
                        placeholder="Введите аннотации"
                        onChange={(event) => setAnnotations(event.target.value)}
                        style={{marginBottom: "10px"}}
                    />
                </Modal>
            </div>
        </div>
    )
}

export default Course;