import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, dispatch } = useContext(UserContext);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'LOGIN',
            payload: { email, password }
        });
    };

    return (
        <>
            <h5>Login</h5>
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
            {/* <button onClick={checkTokenExp}>check token</button> */}
            {/* <br /> */}
            {/* <button onClick={validateToken}>validate token</button> */}
        </>
    );
};
