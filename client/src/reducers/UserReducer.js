export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return [
                ...state,
                {
                    id: action.payload.id,
                    email: action.payload.email,
                    token: action.payload.token
                }
            ];
        case 'LOGOUT':
            return [];
        case 'VALIDATE':
            return [];
        default:
            return state;
    }
};
