import React from "react";
import GroupsItem from "../UI/GroupsItem";
class Groups extends React.Component{
    render() {
        return(
          <div>
              <div style={{backgroundColor: "#EBF5EE", width: "100%", height: "1000px"}}>
                  <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>

                      <div className='card-deck'>
                          <div style={{
                              paddingTop: 100,
                              fontStyle: "normal",
                              fontSize: "60px",
                              display: "flex",
                              justifyContent: "center",
                              color: "#283044"
                          }}>Список групп</div>
                          {
                              this.props.groupsPage.groups.map((value) => {
                                  return <GroupsItem content={value.name} key={value.id}/>
                              })
                          }
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default Groups;