import {
    CREATE_PROJECT,
    CREATE_TASK,
    RETRIEVE_PROJECTS,
    UPDATE_TASK_STATUS,
    DELETE_PROJECT,
    DELETE_ALL_PROJECTS,
} from './types';

export const createProject = ( title ) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_PROJECT,
            payload: title,
        });

        return Promise.resolve(title);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const createTask = ( id, data ) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_TASK,
            payload: { id, data },
        });

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveProjects = () => (dispatch) => {
    try {
        dispatch({
            type: RETRIEVE_PROJECTS,
            payload: null,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateTaskStatus = (id, tid) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_TASK_STATUS,
            payload: { id, tid },
        });

        return Promise.resolve(tid);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteProject = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PROJECT,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllProjects = () => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_ALL_PROJECTS,
            payload: null,
        });

        return Promise.resolve(null);
    } catch (err) {
        return Promise.reject(err);
    }
};
