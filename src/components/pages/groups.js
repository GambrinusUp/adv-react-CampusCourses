import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupsItem from "../UI/GroupsItem";
import {addGroupThunkCreator, loadGroupsThunkCreator} from "../store/groupsReducer";
import {Button, Input, message, Modal} from "antd";
import {useNavigate} from "react-router-dom";
import styles from './style.module.css'

function Groups() {
    const groups = useSelector((state) => state.groupsPage.groups);
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.authorizePage.isAdmin);
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        if(groupName !== ''){
            const token = localStorage.getItem("token");
            dispatch(addGroupThunkCreator(token, groupName)).then(() => {
                success("Group created");
                dispatch(loadGroupsThunkCreator(token));
            });
            setGroupName("");
            setOpen(false);
        }
        else {
            warning("Empty group name");
        }
    };

    const handleCancel = () => {
        setGroupName("");
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setGroupName(event.target.value);
    };

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
        dispatch(loadGroupsThunkCreator(token)).catch(() => {
            localStorage.setItem("token", '');
            navigate('/', {replace: true});
        });
    }, [dispatch, navigate]);

    return (
        <div className={styles.container2}>
            <div className={styles.cardDeck}>
                {contextHolder}
                <div className="card-deck">
                    <div className={styles.title2}>
                        Группы кампусных курсов
                    </div>
                    {isAdmin && (<Button style={{backgroundColor: "#7A80AC",  width: "160px",
                        height: "50px", fontSize: "20px", marginBottom:"20px"}}
                            onClick={() => setOpen(true)}>Создать</Button>)}
                    {groups.map((value) => (
                        <GroupsItem content={value.name} key={value.id} showButtons={isAdmin} id={value.id}/>
                    ))}
                </div>
            </div>
            <Modal
                title="Создание новой группы"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
            >
                <Input
                    value={groupName}
                    placeholder="Введите название группы"
                    onChange={handleInputChange}
                />
            </Modal>
        </div>
    );
}

export default Groups;