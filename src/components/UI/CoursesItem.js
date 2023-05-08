import {Card} from "antd";

function CoursesItem(props) {
    const statusColors = {
        'Created': '#FFFFFF',
        'OpenForAssigning': '#008958',
        'Started': '#826D9C',
        'Finished': '#D68684'
    };

    return(
        <>
            <Card style={{margin: "auto 0", marginBottom: "15px",
                backgroundColor: "#78A1BB", fontSize: "30px", color: "#FFFFFF"}}
                  id={props.id}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 600, width: "50vw"}}>
                    <div style={{fontWeight: "600",fontSize:"40px"}}>{props.title}</div>
                    <div style={{fontWeight: "600", fontSize:"26px", color:statusColors[props.status]}}>{props.status}</div>
                </div>
                <div style={{alignItems: "center", fontSize:"22px", minWidth: 600, width: "50vw"}}>
                    <div>Учебный год - {props.date}-{props.date + 1}</div>
                </div>
                <div style={{alignItems: "center", fontSize:"22px", minWidth: 600, width: "50vw"}}>
                    <div>Семестр - {props.semester}</div>
                </div>
                <div style={{alignItems: "center", fontSize:"16px", minWidth: 600, width: "50vw"}}>
                    <div>Мест всего - {props.allPlaces}</div>
                </div>
                <div style={{alignItems: "center", fontSize:"16px", minWidth: 600, width: "50vw"}}>
                    <div>Мест свободно - {props.availablePlaces}</div>
                </div>
            </Card>
        </>
    )
}

export default CoursesItem;