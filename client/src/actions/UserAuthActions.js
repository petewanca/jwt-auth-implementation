import React from 'react';
import axios from 'axios';

export const LoginUser = (email, password, dispatch) => {
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

    return <></>;
};
