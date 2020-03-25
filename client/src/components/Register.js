import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { titleCase } from 'title-case';
import axios from 'axios';

export const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [localError, setLocalError] = useState('');

    const { auth, dispatch } = useContext(UserContext);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (password === passwordMatch) {
            setLocalError('');
            axios({
                method: 'POST',
                url: '/api/user/register/',
                data: {
                    firstName: titleCase(firstName.toLocaleLowerCase()),
                    lastName: titleCase(lastName.toLocaleLowerCase()),
                    email: email.toLowerCase(),
                    password
                }
            })
                .then((res) => {
                    const { data } = res;
                    dispatch({ type: 'REGISTER_SUCCESS', payload: { success: data } });
                })
                .catch((err) => {
                    setPassword('');
                    setPasswordMatch('');
                    const { data } = err.response;
                    dispatch({ type: 'REGISTER_FAILURE', payload: { error: data } });
                });
        } else if (password !== passwordMatch) {
            setLocalError('Passwords do not match.');
            setPassword('');
            setPasswordMatch('');
        }
    };

    let formRender;

    if (auth.registered) {
        formRender = <Redirect to='/' />;
    } else if (auth.loggedIn) {
        formRender = <Redirect to='/dashboard' />;
    } else {
        formRender = (
            <form onSubmit={handleFormSubmit}>
                <h5>Register</h5>
                <h3>{auth.errorMessage ? auth.errorMessage : null}</h3>
                <h3>{auth.successMessage ? auth.successMessage : null}</h3>
                <h3>{localError ? localError : null}</h3>
                <input
                    placeholder='enter first name'
                    required
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
                <input
                    placeholder='enter last name'
                    required
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <br />

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

                <input
                    placeholder='re-enter password'
                    required
                    type='password'
                    value={passwordMatch}
                    onChange={(e) => setPasswordMatch(e.target.value)}
                />
                <br />
                <button type='submit'>register</button>
            </form>
        );
    }

    return <>{formRender}</>;
};
