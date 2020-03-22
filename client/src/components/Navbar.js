import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>login</Link>
                </li>
                <li>
                    <Link to='/register'>register</Link>
                </li>
                <li>
                    <Link to='/dashboard'>dashboard</Link>
                </li>
            </ul>
        </nav>
    );
};
