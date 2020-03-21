import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token ? console.log(token) : 'nah';
    };

    return (
        <UserContext.Provider value={{ auth, setAuth, getToken }}>{children}</UserContext.Provider>
    );
};
