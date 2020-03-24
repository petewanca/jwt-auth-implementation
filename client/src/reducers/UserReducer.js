import axios from 'axios';
// import jwtDecode from 'jwt-decode';

export const UserReducer = (state, action) => {
    switch (action.type) {
        // ==========================================
        // ========== HANDLE LOGIN ACTION ===========
        // ==========================================
        case 'LOGIN':
            console.log('Dispatched LOGIN action.');
            axios({
                method: 'POST',
                url: '/api/user/login/',
                data: { email: action.payload.email, password: action.payload.password }
            })
                .then((res) => {
                    const { token } = res.data;
                    localStorage.setItem('token', token.split(' ')[1]);
                    state = { loggedIn: true };
                })
                .catch((err) => {
                    localStorage.setItem('error', JSON.stringify(err.response.data));
                    state = { loggedIn: false };
                });
            break;
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
