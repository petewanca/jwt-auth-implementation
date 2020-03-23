import axios from 'axios';
// import jwtDecode from 'jwt-decode';

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
                    // Our bearer token ships with the word
                    // "Bearer" listed before the actual token
                    // so we split the string and take the token
                    // out of the newly created array
                    localStorage.setItem('token', token.split(' ')[1]);
                })
                .catch((err) => console.log(err.response));
            return {};
        case 'LOGOUT':
            return {};
        case 'VALIDATE':
            return {};
        default:
            return state;
    }
};

// const [loggedIn, setLoggedIn] = useState(false);

// const login = (e, email, password) => {
//     e.preventDefault();

//     axios({
//         method: 'POST',
//         url: '/api/user/login/',
//         data: { email, password }
//     })
//         .then((res) => {
//             const { token } = res.data;
//             localStorage.setItem('token', token.split(' ')[1]);
//             setLoggedIn(true);
//             email = '';
//             password = '';
//         })
//         .catch((err) => console.log(err.response));
// };

// const validateToken = async () => {
//     axios({
//         method: 'GET',
//         url: '/api/user/validate',
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//     })
//         .then((res) => console.log(res.data))
//         .catch((err) => console.log(err.response));
// };

// const checkTokenExp = async () => {
//     const token = localStorage.getItem('token');
//     const currentTime = Date.now() / 1000;

//     // if there is a token present, check it
//     if (token) {
//         const decodedToken = await jwtDecode(token);

//         // if the current time is greater than the
//         // token's expiration, console log
//         if (currentTime > decodedToken.exp) {
//             console.log('token has expired');
//             // else log that its still valid
//         } else {
//             console.log('still valid');
//             console.log(decodedToken);
//         }
//     } else console.log('no token');
// };
