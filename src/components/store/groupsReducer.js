import {groupsAPI} from "../API/groupsAPI";

const LOAD_GROUPS = "LOAD_GROUPS";
const ADD_GROUP = "ADD_GROUP"

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

export function loadGroupsThunkCreator(token) {
    return (dispatch) => {
        groupsAPI.getGroups(token).then(data => {
            dispatch(loadGroupsActionCreator(data));
        })
    }
}

export function addGroupThunkCreator(token, name) {
    return (dispatch) => {
        return groupsAPI.addGroups(token, name)
            .then(data => {
                dispatch(addGroupActionCreator(data));
                return Promise.resolve();
            })
            .catch(error => {
                console.log('Ошибка при добавлении группы:', error);
                return Promise.reject();
            });
    };
}

export default groupsReducer;