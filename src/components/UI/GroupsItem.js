import {Card} from "antd";

function GroupsItem(props){
    return(
      <Card style={{ width: 600, margin: "auto 0", marginTop: "30px"}} >
          <div>{props.content}</div>
      </Card>
    );
}

export default GroupsItem;