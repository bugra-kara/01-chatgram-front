import { 
    USER_LOGIN,
    HANDLE_CHANGE,
    USER_LOGOUT,
    LOADING
} from '../utils.js/actions'
const reducer = (state, action) => {
    if(action.type === USER_LOGIN){
        if(action.payload.userId) {
            localStorage.setItem('userId', action.payload.userId)
            localStorage.setItem('username', action.payload.username)
            return {...state, user: action.payload.username, email: "",
            password: "", userId: action.payload.userId }
        }
        else {
            return {...state}
        }
    }
    if(action.type === USER_LOGOUT) {
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        return {...state, isLogged: false,
            user: null,
            isLoading: false,
            username: "",
            email: "",
            password: "",
            userId: null,
        }
    }
    if(action.type === LOADING) {
        const load = state.isLoading ? false : true
        return {...state, isLoading: load}
    }
    if(action.type === HANDLE_CHANGE) {
        const { name, value } = action.payload
        return {...state, [name]: value }
    }
    
    return state
}
export default reducer