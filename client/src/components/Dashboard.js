import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';

export const Dashboard = () => {
    const { auth, dispatch } = useContext(UserContext);
    const loggedIn = auth.loggedIn;

    return (
        <>
            {loggedIn ? (
                <div>
                    <h5>Protected Component/Route</h5>
                    <button onClick={() => dispatch({ type: 'LOGOUT' })}>sign out</button>
                    <button onClick={() => dispatch({ type: 'VALIDATE' })}>verify</button>
                </div>
            ) : (
                <Redirect to='/' />
            )}
        </>
    );
};
