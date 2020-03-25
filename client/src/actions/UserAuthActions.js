import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

export const LoginUser = (email, password) => {
    const { dispatch } = useContext(UserContext);

    axios({
        method: 'POST',
        url: '/api/user/login/',
        data: { email, password }
    })
        .then((res) => {
            const { token } = res.data;
            localStorage.setItem('token', token.split(' ')[1]);
            dispatch({ type: 'HANDLE_LOGIN_DATA', payload: {} });
        })
        .catch((err) => {
            localStorage.setItem('error', JSON.stringify(err.response.data));
        });
};
