import { 
    USER_LOGIN,
    HANDLE_CHANGE,
    USER_LOGOUT,
    LOADING
} from '../utils.js/actions'
const reducer = (state, action) => {
    if(action.type === USER_LOGIN){
        if(action.payload.userId) {
            localStorage.setItem('userId', JSON.stringify(action.payload.userId))
            return {...state, isLogged: true, user: { username: action.payload.username, id: action.payload.userId }, email: "",
            password: "", userId: action.payload.userId }
        }
        else {
            return {...state}
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
    if(action.type === USER_LOGOUT) {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        return {...state, isLogged: false,
            user: null,
            username: "",
            userId: null,
            email: "",
            isLoading: false,
            token: null
        }
    }
    return state
}
export default reducer