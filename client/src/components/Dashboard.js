import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export const Dashboard = () => {
    const { auth, dispatch } = useContext(UserContext);

    const handleValidation = () => {
        axios({
            method: 'GET',
            url: '/api/user/validate',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res);
                dispatch({ type: 'VALIDATE_SUCCESS' });
            })
            .catch((err) => {
                console.log(err.response);
                dispatch({ type: 'VALIDATE_FAILURE' });
            });
    };
    return (
        <>
            {auth.loggedIn ? (
                <div>
                    <h5>Protected Component/Route</h5>
                    <h3>{auth.successMessage ? auth.successMessage : null}</h3>
                    <button onClick={() => dispatch({ type: 'LOGOUT' })}>sign out</button>
                    <button onClick={handleValidation}>verify</button>
                </div>
            ) : (
                <Redirect to='/' />
            )}
        </>
    );
};
