import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const UserReducer = (state, action) => {
    switch (action.type) {
        // # DESC  ==================================
        // # HANDLE SUCCESS RES FROM AXIOS LOGIN CALL
        case 'LOGIN':
            console.log('LOGIN action dispatched.');
            const token = action.payload.token;
            if (token) {
                const currentTime = Date.now() / 1000;
                const { exp } = jwtDecode(token);
                if (currentTime >= exp) return { loggedIn: false };
                if (exp > currentTime) return { loggedIn: true };
            }
            break;
        // # DESC ===================================
        // ==========================================
        case 'LOGOUT':
            console.log('LOGOUT action dispatched.');
            localStorage.removeItem('token');
            return {
                loggedIn: false
            };

        // ======= HANDLE VALIDATION ACTION =========
        // ==========================================
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
