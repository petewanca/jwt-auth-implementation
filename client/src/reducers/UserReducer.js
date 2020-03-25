import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const UserReducer = (state, action) => {
    switch (action.type) {
        // ==========================================
        // ========== HANDLE LOGIN ACTION ===========
        // ==========================================
        case 'LOGIN':
            console.log('Dispatched LOGIN action.');
            const token = action.payload.token;
            if (token) {
                const currentTime = Date.now() / 1000;
                const { exp } = jwtDecode(token);

                if (currentTime >= exp) return { loggedIn: false };

                if (exp > currentTime) return { loggedIn: true };
            }
            return state;
        // ==========================================
        // ========= HANDLE LOGOUT ACTION ===========
        // ==========================================
        case 'LOGOUT':
            console.log('Dispatched LOGOUT action.');
            localStorage.removeItem('token');
            return {
                loggedIn: false
            };

        // ==========================================
        // ======= HANDLE VALIDATION ACTION =========
        // ==========================================
        case 'VALIDATE':
            console.log('Dispatched VALIDATE action.');
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
