import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// look into passing information back after your axios post routes have run

// this will need to be handled client side for redirection

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            axios({
                method: 'POST',
                url: '/api/user/login/',
                data: {
                    email: action.payload.email,
                    password: action.payload.password
                }
            })
                .then((res) => {
                    const { token } = res.data;
                    localStorage.setItem('token', token.split(' ')[1]);
                })
                .catch((err) => console.log(err.response));

        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                loggedIn: false
            };

        case 'VALIDATE':
            axios({
                method: 'GET',
                url: '/api/user/validate',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res) => console.log(res.data))
                .catch((err) => {
                    console.log(err.response);
                    localStorage.removeItem('token');
                });

        default:
            return state;
    }
};
