import {Button, Card, Input, Modal} from "antd";
//import {useDispatch} from "react-redux";
import {useState} from "react";

function GroupsItem(props){
    //const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState(false);
    const [groupName, setGroupName] = useState("");

    const handleOkEdit = () => {
        console.log(groupName);
        setGroupName("");
        setOpenEdit(false);
    };

    const handleCancelEdit = () => {
        setGroupName("");
        setOpenEdit(false);
    };

    const handleInputChangeEdit = (event) => {
        setGroupName(event.target.value);
    };
    return(
        <>
            <Card style={{margin: "auto 0", marginTop: "35px", display: "flex",
                backgroundColor: "#78A1BB", fontSize: "30px", color: "#FFFFFF"}} >
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 600, width: "50vw"}}>
                    <div>{props.content}</div>
                    {props.showButtons && (
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Button type="primary" style={{marginRight: "10px", backgroundColor:"#EEE8A9", color: "#283044"}}
                                    onClick={() => {setOpenEdit(true); setGroupName(props.content)}}>Редактировать</Button>
                            <Button type="primary" style={{backgroundColor: "#DF8280", color: "#283044"}}>Удалить</Button>
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