import React, { createContext, useReducer, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { UserReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    // Setting a default value for the auth state
    // by looking for a token in local storage
    const [auth, dispatch] = useReducer(UserReducer, {}, () => {
        const token = localStorage.getItem('token');
        let data;

        // If there's a token, compare the current
        // time to when the token expires
        if (token) {
            const { id, email, iat, exp } = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            // If the token is expired, clear the token from
            // local storage and set auth.loggedIn to false
            if (currentTime >= exp) {
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

    return <UserContext.Provider value={{ auth, dispatch }}>{children}</UserContext.Provider>;
};
