import {connect} from "react-redux";
import React from "react";
import Groups from "../pages/groups";
import { loadGroupsThunkCreator} from "../store/groupsReducer";

class MiddleGroupsComponent extends React.Component {
    componentDidMount() {
        let token = localStorage.getItem("token");
        this.props.loadGroupsThunkCreator(token);
    }
    render() {
        return (<Groups {...this.props}/>)
    }
}

function mapStateToProps(state) {
    return { groupsPage : state.groupsPage}
}

const groupsContainer = connect(mapStateToProps, {loadGroupsThunkCreator})(MiddleGroupsComponent)

export default groupsContainer;