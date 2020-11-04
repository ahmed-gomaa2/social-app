export default function(state= null, action) {
    switch (action.type) {
        case 'CREATE_NEW_USER':
            return action.payload
        case 'LOG_USER_IN':
            return action.payload;
        case 'FETCHING_USER':
            return action.payload
        case 'LOG_USER_OUT':
            return action.payload
        default:
            return state
    }
}