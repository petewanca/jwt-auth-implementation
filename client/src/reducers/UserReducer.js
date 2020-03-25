import jwtDecode from 'jwt-decode';

export const UserReducer = (state, action) => {
    switch (action.type) {
        // # CASE DESC
        // # Handle success response from Axios login call
        case 'LOGIN_SUCCESS':
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
            return {
                loggedIn: false,
                errorMessage: action.payload.error
            };

        // # CASE DESC
        // # Handle logout button click from client
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                loggedIn: false
            };

        // # CASE DESC
        // # Handle success response from Axios register call
        case 'REGISTER_SUCCESS':
            return {
                loggedIn: false,
                registered: true,
                successMessage: action.payload.success
            };

        // # CASE DESC
        // # Handle failure response from Axios register call
        case 'REGISTER_FAILURE':
            return {
                loggedIn: false,
                errorMessage: action.payload.error
            };

        // # CASE DESC
        // # Handle successful validation of token
        case 'VALIDATE_SUCCESS':
            return {
                loggedIn: true,
                successMessage: 'Still authorized!'
            };

        // # CASE DESC
        // # Handle failed validation of token
        case 'VALIDATE_FAILURE':
            localStorage.removeItem('token');
            return {
                loggedIn: false,
                errorMessage: 'Your session has expired.'
            };

        default:
            return state;
    }
};
