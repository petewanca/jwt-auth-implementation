import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';

export const Dashboard = () => {
    const { auth } = useContext(UserContext);
    const loggedIn = auth.loggedIn;

    return (
        <>
            {loggedIn ? (
                <div>
                    <h5>Protected Component/Route</h5>
                    <button>check stuff</button>
                </div>
            ) : (
                <Redirect to='/' />
            )}
        </>
    );
};
