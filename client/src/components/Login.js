import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, checkTokenExp, validateToken } = useContext(UserContext);

    return (
        <>
            <form onSubmit={(e) => login(e, email, password)}>
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
            <button onClick={checkTokenExp}>check token</button>
            <br />
            <button onClick={validateToken}>validate token</button>
        </>
    );
};
