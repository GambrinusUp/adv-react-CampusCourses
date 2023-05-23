import {groupsAPI} from "../API/groupsAPI";

const LOAD_GROUPS = "LOAD_GROUPS"
const ADD_GROUP = "ADD_GROUP"
const EDIT_GROUP = "EDIT_GROUP"
const DELETE_GROUP = "DELETE_GROUP"

let initialState = {
    groups : []
}

const groupsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_GROUPS:
            newState.groups = action.groups;
            return newState;
        case ADD_GROUP:
            newState.groups.push(action.group);
            return newState;
        case EDIT_GROUP:
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].id === action.group.id) {
                    newState[i].name = action.group.name;
                    break;
                }
            }
            return newState;
        case DELETE_GROUP:
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].id === action.id) {
                    newState.splice(i, 1);
                    break;
                }
            }
            return newState;
        default:
            return newState;
    }
}

export function loadGroupsActionCreator(groups) {
    return {type: LOAD_GROUPS, groups : groups}
}

export function addGroupActionCreator(group) {
    return {type: ADD_GROUP, group: group}
}

export function editGroupActionCreator(group) {
    return {type: EDIT_GROUP, group: group}
}

export function deleteGroupActionCreator(id) {
    return {type: DELETE_GROUP, id: id}
}

export const loadGroupsThunkCreator = (token) => (dispatch) => {
    return groupsAPI.getGroups(token).then(
        (data) => {
            if(data.status === 200) {
                dispatch(loadGroupsActionCreator(data.groups));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    );
};

export function addGroupThunkCreator(token, name) {
    return (dispatch) => {
        return groupsAPI.addGroups(token, name).then(
            (data) => {
                if(data.status === 200){
                    dispatch(addGroupActionCreator(data));
                    return Promise.resolve()
                }
                return Promise.reject();
            })
    };
}

export function deleteGroupThunkCreator(token, id) {
    return (dispatch) => {
        return groupsAPI.deleteGroups(token, id).then(
            (data) => {
                if(data.status === 200) {
                    dispatch(deleteGroupActionCreator(id));
                    return Promise.resolve();
                }
                return Promise.reject();
            })
    }
}

export function editGroupThunkCreator(token, id, name) {
    return (dispatch) => {
        return groupsAPI.editGroups(token, name, id).then(
            (data) => {
                if(data.status === 200) {
                    dispatch(editGroupActionCreator(data.group));
                    return Promise.resolve();
                }
                return Promise.reject();
            })
    }
}

export default groupsReducer;