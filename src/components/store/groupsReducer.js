import {groupsAPI} from "../API/groupsAPI";

const LOAD_GROUPS = "LOAD_GROUPS";

let initialState = {
    groups : []
}

const groupsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_GROUPS:
            newState.groups = action.groups;
            return newState;
        default:
            return newState;
    }
}

export function loadGroupsActionCreator(groups) {
    return {type: LOAD_GROUPS, groups : groups}
}

export function loadGroupsThunkCreator(token) {
    return (dispatch) => {
        groupsAPI.getGroups(token).then(data => {
            dispatch(loadGroupsActionCreator(data));
        })
    }
}

export default groupsReducer;