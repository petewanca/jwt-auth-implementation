import React from 'react';
import './App.css';
import { UserContextProvider } from './contexts/UserContext';
import { Login } from './components/Login';

const App = () => {
    return (
        <UserContextProvider>
            <Login />
        </UserContextProvider>
    );
};

export default App;
