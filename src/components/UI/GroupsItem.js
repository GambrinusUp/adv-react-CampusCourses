import {Button, Card, Input, message, Modal, Popconfirm} from "antd";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {deleteGroupThunkCreator, editGroupThunkCreator, loadGroupsThunkCreator} from "../store/groupsReducer";
import {Link} from "react-router-dom";

function GroupsItem(props){
    const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const handleOkEdit = () => {
        if(groupName !== '') {
            const token = localStorage.getItem("token");
            dispatch(editGroupThunkCreator(token, props.id, groupName)).then(() => {
                dispatch(loadGroupsThunkCreator(token));
                success("Group edited");
            })
                .catch(() => {
                    console.log("ОШибка");
                });
            setGroupName("");
            setOpenEdit(false);
        }
        else {
            warning("Empty group name");
        }
    };

    const deleteGroup = () => {
        const token = localStorage.getItem("token");
        dispatch(deleteGroupThunkCreator(token, props.id)).then(() => {
            success("Group deleted");
            setTimeout(() => {
                dispatch(loadGroupsThunkCreator(token));
            }, 500);
        })
    };

    const handleCancelEdit = () => {
        setGroupName("");
        setOpenEdit(false);
    };

    const handleInputChangeEdit = (event) => {
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

    return(
        <>
            {contextHolder}
            <Card style={{margin: "auto 0", marginBottom: "15px", display: "flex",
                backgroundColor: "#78A1BB", fontSize: "30px", color: "#FFFFFF"}}
            id={props.id}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 600, width: "50vw"}}>
                    <div><Link to={`/groups/${props.id}`} style={{ color: '#fff' }}>
                        {props.content}
                    </Link></div>
                    {props.showButtons && (
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Button type="primary" style={{marginRight: "10px", backgroundColor:"#EEE8A9", color: "#283044"}}
                                    onClick={() => {setOpenEdit(true); setGroupName(props.content)}}>Редактировать</Button>
                            <Popconfirm
                                title="Вы хотите удалить группу?"
                                onConfirm={deleteGroup}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button type="primary" style={{backgroundColor: "#DF8280", color: "#283044"}}>Удалить</Button>
                            </Popconfirm>
                        </div>
                    )}
                </div>
            </Card>
            <Modal
                title="Редактирование группы"
                centered
                open={openEdit}
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                width={700}
            >
                <Input
                    value={groupName}
                    placeholder="Введите название группы"
                    onChange={handleInputChangeEdit}
                />
            </Modal>
        </>
        );
}

export default GroupsItem;