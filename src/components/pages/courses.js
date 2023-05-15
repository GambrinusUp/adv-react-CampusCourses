import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CoursesItem from "../UI/CoursesItem";
import {Button, Input, message, Modal, Radio, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {createCourseOfGroupThunkCreator, loadCoursesThunkCreator, loadUsersThunkCreator} from "../store/coursesReducer";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function Courses() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.authorizePage.isAdmin);
    const isStudent = useSelector((state) => state.authorizePage.isStudent);
    const courses = useSelector((state) => state.coursesPage.courses);
    const users = useSelector((state) => state.coursesPage.users)
    const [messageAPI, contextHolder] = message.useMessage();
    const [courseName, setCourseName] = useState("");
    const [startYear, setStartYear] = useState("");
    const [maximumStudentsCount, setMaximumStudentsCount] = useState("");
    const [requirements, setRequirements] = useState("");
    const [annotations, setAnnotations] = useState("");
    const [value, setValue] = useState('Autumn');
    const [valueTeacher, setTeacher] = useState('');
    const [open, setOpen] = useState(false);

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

    const options = users.map(({ id, fullName }) => ({
        value: id,
        label: fullName,
    }));

    const yearRegex = /^20(0\d|1\d|2[0-9])$/;
    const seatRegex = /^[1-9]\d*$/;

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handleOk = () => {
        const token = localStorage.getItem("token");
        console.log(valueTeacher);
        console.log(value);
        if(courseName !== '' && yearRegex.test(startYear) && seatRegex.test(maximumStudentsCount)
            && requirements !== '' && annotations !== '' && valueTeacher !== '') {
            dispatch(createCourseOfGroupThunkCreator(token, id, courseName, startYear, maximumStudentsCount, value,
                requirements, annotations, valueTeacher)).then(() => {
                dispatch(loadCoursesThunkCreator(token, id)).then(() => {
                    success("Course created");
                    dispatch(loadCoursesThunkCreator(token, id));
                });
            });
            setOpen(false);
        } else {
            warning("Incorrect data");
        }
    };

    const handleCancel = () => {
        setCourseName("");
        setOpen(false);
    };

    const warning = (error) => {
        messageAPI.open({
            type: 'warning',
            content: error,
        });
    };

    const success = (message) => {
        messageAPI.open({
            type: 'success',
            content: message,
        });
    };

    const onChangeSelect = (value) => {
        setTeacher(value);
        console.log(`selected ${value}`);
    };

    useEffect(() => {
        //loadCourses(id);
        console.log(id);
        const token = localStorage.getItem("token");
        dispatch(loadCoursesThunkCreator(token, id)).then(() => {
            console.log(courses);
            if(isAdmin) {
                console.log(isStudent);
                dispatch(loadUsersThunkCreator(token));
            }
        })
        // eslint-disable-next-line
    }, [dispatch, id, navigate]);

    return(
        <div style={{ backgroundColor: "#EBF5EE", width: "100%", minHeight: "1000px"}}>
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                {contextHolder}
                <div className="card-deck">
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
                    {isAdmin && (<Button style={{backgroundColor: "#7A80AC",  width: "160px",
                        height: "50px", fontSize: "20px", marginBottom:"20px"}}
                                         onClick={() => setOpen(true)}>Создать</Button>)}
                    {courses.map((value) => (
                        <CoursesItem title={value.name} key={value.id} id={value.id} date={value.startYear} semester={value.semester}
                                     availablePlaces={value.remainingSlotsCount} allPlaces={value.maximumStudentsCount} status={value.status}></CoursesItem>
                    ))}
                </div>
            </div>
            <Modal
                title="Создание нового курса"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                style={{color: "#FFFFFF"}}
            >
                Название курса
                <Input
                    value={courseName}
                    placeholder="Введите название курса"
                    onChange={(event) => setCourseName(event.target.value)}
                    style={{marginBottom: "10px"}}
                />
                Год начала курса
                <Input
                    value={startYear}
                    placeholder="Введите год начала курса"
                    onChange={(event) => setStartYear(event.target.value)}
                    style={{marginBottom: "10px"}}
                />
                Общее количество мест
                <Input
                    value={maximumStudentsCount}
                    placeholder="Введите общее количество мест"
                    onChange={(event) => setMaximumStudentsCount(event.target.value)}
                    style={{marginBottom: "10px"}}
                />
                Семестр
                <div style={{marginBottom: "10px"}}>
                    <Radio.Group onChange={onChange} value={value}
                                 style={{color: "#FFFFFF"}}>
                        <Radio style={{color: "#FFFFFF"}} value={'Autumn'}>Осенний</Radio>
                        <Radio style={{color: "#FFFFFF"}} value={'Spring'}>Весенний</Radio>
                    </Radio.Group>
                </div>
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
                Основной преподаватель курса
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
        </div>
    )
}

export default Courses;