import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import decode from 'jwt-decode';
// import { Redirect } from 'react-router-dom';

export const Login = () => {
    const { auth, setAuth } = useContext(UserContext);

    // useEffect(() => {
    //     axios({
    //         method: 'GET',
    //         url: '/api/user/test',
    //         headers: {
    //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzUzYjhhNDAyZjM0MjhiOGZhYzcwZSIsImVtYWlsIjoicGV0ZUBwZXRlLmNvbSIsImlhdCI6MTU4NDgwNjMyMCwiZXhwIjoxNTg0ODA5OTIwfQ.Vecj-QWuTQVpZjWXHPIwFkKzgEeL7CGIAIO24rRUZDY`
    //         },
    //         data: {
    //             email: 'pete@pete.com',
    //             password: 'password'
    //         }
    //     })
    //         .then((res) => console.log(res.data))
    //         .catch((err) => console.log(err.response));
    // });

    const login = () => {
        axios({
            method: 'POST',
            url: '/api/user/login/',
            data: {
                email: 'pete@pete.com',
                password: 'password'
            }
        })
            .then((res) => {
                const { id, email, token } = res.data;
                console.log(res.data);
                localStorage.setItem('id', id);
                localStorage.setItem('email', email);
                localStorage.setItem('token', token);
            })
            .catch((err) => console.log(err.response));
    };

    const checkToken = async () => {
        const rawToken = localStorage.getItem('token');
        const token = rawToken.split(' ')[1];
        console.log(token);
        const decoded = await decode(token);
        console.log(decoded);
        // if (data) {
        //     const parsedData = await JSON.parse(data);
        //     const decodedToken = await decode(parsedData);
        //     console.log(decodedToken);
        // }
    };

    return (
        <div>
            <button onClick={login}>Login</button>
            <h3>User</h3>
            <button onClick={checkToken}>Check Token</button>
            {/* <p>{user.id}</p>
            <p>{user.email}</p>
            <p>{user.token}</p> */}
        </div>
    );
};
