import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const Protected = () => {
    return (
        <div>
            <h3>Protected Component/Route</h3>
            <button>check stuff</button>
        </div>
    );
};
