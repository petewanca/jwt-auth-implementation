import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
// import { Redirect } from 'react-router-dom';

export const Login = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const { login, checkTokenExp, validateToken } = useContext(UserContext);

    return (
        <>
            <form onSubmit={(e) => login(e, emailInput, passwordInput)}>
                <input
                    placeholder='enter email'
                    required
                    type='email'
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <input
                    placeholder='enter password'
                    required
                    type='text'
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button type='submit'>login</button>
            </form>
            <button onClick={checkTokenExp}>check token</button>
            <button onClick={validateToken}>validate token</button>
        </>
    );
};
