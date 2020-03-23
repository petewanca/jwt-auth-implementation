import React, { useState, createContext, useReducer } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { UserReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    // Setting a default value for the auth state
    // by looking for a token in local storage
    const [auth, dispatch] = useReducer(UserReducer, {}, () => {
        let data;
        let token = localStorage.getItem('token');

        // If there's a token, compare the current
        // time to when the token expires
        if (token) {
            let { id, email, iat, exp } = jwtDecode(token);
            let currentTime = Date.now() / 1000;
            // If the token is expired, clear the token from
            // local storage and set auth.loggedIn to false
            if (currentTime > exp) {
                localStorage.removeItem('token');
                data = {
                    loggedIn: false
                };
                // If the token has not expired set auth.loggedIn to true
                // and initialize the rest of auth state with user data
            } else if (exp > currentTime) {
                data = {
                    loggedIn: true,
                    id,
                    email,
                    iat,
                    exp
                };
            }
        }
        // State is returned as an object with a property of
        // "loggedIn" set as a boolean value based on above logic
        return token ? data : { loggedin: false };
    });

    const [loggedIn, setLoggedIn] = useState(false);

    const login = (e, email, password) => {
        e.preventDefault();

        axios({
            method: 'POST',
            url: '/api/user/login/',
            data: { email, password }
        })
            .then((res) => {
                const { token } = res.data;
                localStorage.setItem('token', token.split(' ')[1]);
                setLoggedIn(true);
                email = '';
                password = '';
            })
            .catch((err) => console.log(err.response));
    };

    const validateToken = async () => {
        axios({
            method: 'GET',
            url: '/api/user/validate',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.response));
    };

    const checkTokenExp = async () => {
        const token = localStorage.getItem('token');
        const currentTime = Date.now() / 1000;

        // if there is a token present, check it
        if (token) {
            const decodedToken = await jwtDecode(token);

            // if the current time is greater than the
            // token's expiration, console log
            if (currentTime > decodedToken.exp) {
                console.log('token has expired');
                // else log that its still valid
            } else {
                console.log('still valid');
                console.log(decodedToken);
            }
        } else console.log('no token');
    };

    return (
        <UserContext.Provider
            value={{ auth, dispatch, loggedIn, setLoggedIn, login, checkTokenExp, validateToken }}
        >
            {children}
        </UserContext.Provider>
    );
};
