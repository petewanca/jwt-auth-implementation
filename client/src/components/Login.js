import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
// import { LoginUser } from '../actions/UserAuthActions';
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { auth, dispatch } = useContext(UserContext);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // I've tried importing LoginUser from an Actions folder so that
        // could store my axios call but when I try to run line 20, I get
        // an invalid hook call. Calling dispatch in the file that contains
        // LoginUser() ('../actions/UserAuthActions') throws errors
        // LoginUser(email, password);

        axios({
            method: 'POST',
            url: '/api/user/login/',
            data: { email, password }
        })
            .then((res) => {
                const { token } = res.data;
                localStorage.removeItem('error');
                localStorage.setItem('token', token.split(' ')[1]);
                dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
            })
            .catch((err) => {
                setPassword('');
                const { data } = err.response;
                localStorage.setItem('error', data);
                dispatch({ type: 'LOGIN_ERROR', payload: { error: data } });
            });
    };

    return (
        <>
            {auth.loggedIn ? (
                <Redirect to='/dashboard' />
            ) : (
                <div>
                    <h5>Login</h5>
                    <h3>{auth.errorMessage ? auth.errorMessage : null}</h3>
                    <h3>{auth.successMessage ? auth.successMessage : null}</h3>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            placeholder='enter email'
                            required
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <input
                            placeholder='enter password'
                            required
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <button type='submit'>login</button>
                    </form>
                </div>
            )}
        </>
    );
};
