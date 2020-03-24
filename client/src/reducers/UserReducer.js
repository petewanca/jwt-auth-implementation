import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// look into passing information back after your axios post routes have run

// this will need to be handled client side for redirection

export const UserReducer = (state, action) => {
    switch (action.type) {
        // ==========================================
        // ========== HANDLE LOGIN ACTION ===========
        // ==========================================
        case 'LOGIN':
            console.log('action login is happening!');
            // LoginHelper(action.payload.email, action.payload.password, state);
            axios({
                method: 'POST',
                url: '/api/user/login/',
                data: { email: action.payload.email, password: action.payload.password }
            })
                .then((res) => {
                    const { token } = res.data;
                    localStorage.setItem('token', token.split(' ')[1]);
                })
                .catch((err) => {
                    localStorage.setItem('error', JSON.stringify(err.response.data));
                    state = { loggedIn: false };
                });

            const token = localStorage.getItem('token');
            if (token) {
                return { loggedIn: true };
            }
        // ==========================================
        // ========= HANDLE LOGOUT ACTION ===========
        // ==========================================
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                loggedIn: false
            };

        // ==========================================
        // ======= HANDLE VALIDATION ACTION =========
        // ==========================================
        case 'VALIDATE':
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
