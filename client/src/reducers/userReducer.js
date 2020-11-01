export default function(state= null, action) {
    switch (action.type) {
        case 'CREATE_NEW_USER':
            console.log(action.payload);
            return action.payload
        case 'LOG_USER_IN':
            console.log(action.payload);
            return action.payload;
        case 'FETCHING_USER':
            console.log(action.payload)
            return action.payload
        default:
            return state
    }
}