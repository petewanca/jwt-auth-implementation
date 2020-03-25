import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const UserReducer = (state, action) => {
    switch (action.type) {
        // # CASE DESC
        // # Handle success response from Axios login call
        case 'LOGIN_SUCCESS':
            console.log('LOGIN SUCCESS action dispatched.');
            const token = action.payload.token;
            if (token) {
                const currentTime = Date.now() / 1000;
                const { exp } = jwtDecode(token);
                if (currentTime >= exp) return { loggedIn: false };
                if (exp > currentTime) return { loggedIn: true };
            }
            break;

        // # CASE DESC
        // # Handle failure response from Axios login call
        case 'LOGIN_ERROR':
            console.log('LOGIN ERROR action dispatched.');

            return { loggedIn: false, errorMessage: action.payload.error };

        // # CASE DESC
        // # Handle logout button click from client
        case 'LOGOUT':
            console.log('LOGOUT action dispatched.');
            localStorage.removeItem('token');
            return { loggedIn: false };

        // # CASE DESC
        // # Handle test validation of token
        case 'VALIDATE':
            console.log('VALIDATE action dispatched.');
            axios({
                method: 'GET',
                url: '/api/user/validate',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res) => console.log(res))
                .catch((err) => console.log(err.response));

            return state;
        default:
            return state;
    }
};
