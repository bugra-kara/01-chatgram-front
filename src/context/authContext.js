import axios from 'axios'
import React, { useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import reducer from '../reducers/authReducer'
import { USER_LOGIN, HANDLE_CHANGE, USER_LOGOUT, LOADING } from '../utils.js/actions'
import { useUserContext } from './userContext'
import { notify } from '../utils.js/notifications'
const initialState =  {
    isLogged: false,
    user: null,
    userId: JSON.parse(localStorage.getItem("userId")),
    isLoading: false,
    token: null,
    username: "",
    email: "",
    password: "",
}

const AuthContext = React.createContext()
export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { loginUser } = useUserContext()
    const navigate = useNavigate()
    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        try {
            const resp = await axios.post('https://chatgram.onrender.com/api/v1/auth/register', {email: state.email, password: state.password, username: state.username}, {withCredentials: true})
            if(resp.statusText === 'Created'){
                notify(200, "Registered!");
                setTimeout(() => {
                    navigate('/login')
                }, 2750);
            }
        } catch (error) {
            notify(404, error.response.data.msg)
        }
    }
    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        dispatch({type: LOADING})
        try {
            const resp = await axios.post('https://chatgram.onrender.com/api/v1/auth/login', {email: state.email, password: state.password}, {withCredentials: true})
            if(resp.data.result === "failed") {
                notify(404, resp.data.msg);
            }
            else {
                console.log(resp.data.data);
                const { username, userId } = resp.data.data
                if( userId) {
                    dispatch({type: USER_LOGIN, payload: {username, userId}});
                    loginUser()
                    notify(200, "Logged in!");
                    navigate('/')
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = (e) => {
        dispatch({type: HANDLE_CHANGE, payload: { name: e.target.name, value: e.target.value}})
    }
    const handleLoading = () => {
        dispatch({type: LOADING})
    }
    const handleQuit = async () => {
        try {
            const resp = await axios.delete('https://chatgram.onrender.com/api/v1/auth/logout', {withCredentials: true})
            if(resp.status === 200) {
              dispatch({type: USER_LOGOUT});
              notify(200, "Logged out!");
              setTimeout(() => {
                navigate('/login')
            }, 2750);
            }
        } catch (error) {
            console.log(error);
        }
        dispatch({type: USER_LOGOUT});
    }
    return (
        <AuthContext.Provider value={{state, handleSubmitRegister, handleSubmitLogin, handleChange, handleQuit, handleLoading}}>{children}</AuthContext.Provider>
      )
}

// make sure use
export const useAuthContext = () => {
    return useContext(AuthContext)
  }
