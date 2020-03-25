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
        // # Handle successful validation of token
        case 'VALIDATE_SUCCESS':
            console.log('VALIDATE SUCCESS action dispatched.');
            return { ...state, successMessage: 'Still authorized!' };

        // # CASE DESC
        // # Handle failed validation of token
        case 'VALIDATE_FAILURE':
            console.log('VALIDATE FAILURE action dispatched.');
            localStorage.removeItem('token');
            return {
                loggedIn: false,
                errorMessage:
                    "Your login session's security was compromised. If this issue persists, please contact our support team."
            };

        // # CASE DESC
        // # Handle success response from Axios register call
        case 'REGISTER_SUCCESS':
            console.log('REGISTER SUCCESS action dispatched.');
            return { loggedIn: false, successMessage: action.payload.success };

        // # CASE DESC
        // # Handle failure response from Axios register call
        case 'REGISTER_FAILURE':
            console.log('REGISTER FAILURE action dispatched.');
            return { loggedIn: false, errorMessage: action.payload.error };
        default:
            return state;
    }
};
