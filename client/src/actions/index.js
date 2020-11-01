import axios from 'axios';

export const createNewUser = user => async dispatch => {
    const res = await axios.post('/api/register', user);

    dispatch({
        type:'CREATE_NEW_USER',
        payload: res.data
    })
}

export const logUserIn = user => async dispatch => {
    const res = await axios.post('/api/login', user);

    dispatch({
        type: 'LOG_USER_IN',
        payload: res.data
    })
}

export const fetchingUser = () => async dispatch => {
    const res = await axios.get('/api/user');

    dispatch({
        type: 'FETCHING_USER',
        payload: res.data
    })
}