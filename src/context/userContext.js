import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { GET_ALL_CHATS, SELECT_USER, GET_ONE_CHAT, NEW_MESSAGE, USER_LOGOUT, USER_LOGIN, FRIEND_REQUEST, FRIEND_RESPONSE, FRIEND_ADDED } from '../utils.js/actions'
import reducer from '../reducers/userReducer'
import { notify } from '../utils.js/notifications'
const initialState =  {
  friendsReq: [],
  chats: [],
  isSelect: false,
  isChat: false,
  newMsg: false,
  selectedUser: null,
  selectedChat: [],
  userAdded: false,
  receivedMsg: false,
  addedUserId: null
}
const UserContext = React.createContext()
export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const selectUser = async (selectedUserData) => {
      dispatch({type: SELECT_USER, payload: {selectedUserData}})
    }
    const getAllChatsContext = async (resp) => {
      console.log(resp);
      dispatch({type: GET_ALL_CHATS, payload: resp})
    }
    const getOneChatContext = async (resp) => {
      dispatch({type: GET_ONE_CHAT, payload: resp})
    }
    const getAllChats = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('userId'))
        const resp = await axios.get(`https://chatgram.onrender.com/api/v1/chats/users/${state.selectedUser.selectedUserData.chatId}?userId=${userId}`,{withCredentials: true})
        getOneChatContext(resp)
      } catch (error) {
        console.log(error);
      }
    }
    const newMessage = async (data) => {
      dispatch({type: NEW_MESSAGE, payload:data})
    }
    const logoutUser = () => {
      dispatch({type: USER_LOGOUT})
    }
    const loginUser = () => {
      dispatch({type: USER_LOGIN})
    }
    const friendReq = async (data) => {
      console.log(data);
      try {
        const resp = await axios.patch(`https://chatgram.onrender.com/api/v1/users/friend/req`,{userId: data},{withCredentials: true})
      } catch (error) {
        console.log(error);
      }
      
    }
    const getFriendReq = async (data) => {
      try {
        const resp = await axios.get(`https://chatgram.onrender.com/api/v1/users/friend/req?user=${data}`,{withCredentials: true})
        dispatch({type: FRIEND_REQUEST, payload: resp})
      } catch (error) {
        console.log(error);
      }
    }
    const friendRes = async (payload) => {
      console.log(payload);
      if(payload.ask === 'accept'){
        try {
          const user = JSON.parse(localStorage.getItem('userId'))
          // eslint-disable-next-line no-dupe-keys
          const resp = await axios.post(`https://chatgram.onrender.com/api/v1/chats/users`,{chatUsers: [{userId:user }, {userId: payload.id}], },{withCredentials: true})
          if(resp.data.result === "success"){
            try {
              const resp = await axios.patch(`https://chatgram.onrender.com/api/v1/users/friend/res`,{fId: payload.id},{withCredentials: true})
              if(resp.data.result === "success"){
                dispatch({type: FRIEND_ADDED})
                dispatch({type: FRIEND_RESPONSE, payload: payload.id})
                notify(200,"Friend Added!")
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      else if (payload.ask === 'reject'){
        try {
          const resp = await axios.patch(`https://chatgram.onrender.com/api/v1/users/friend/resReject`,{fId: payload.id},{withCredentials: true})
          dispatch({type: FRIEND_RESPONSE, payload: payload.id})
          notify(100,"Friend Rejected!")
        } catch (error) {
          console.log(error);
        }
      }
      }
      const socketFriendRes = () => {
        dispatch({type: FRIEND_ADDED})
      }
    useEffect(()=> {
      if(state.isChat) {
        getAllChats()
      }
    },[state.isChat])
    return (
        <UserContext.Provider value={{...state, socketFriendRes, getFriendReq, friendReq, friendRes, getAllChatsContext, selectUser, getOneChatContext, newMessage, logoutUser, loginUser}}>{children}</UserContext.Provider>
      )
}

// make sure use
export const useUserContext = () => {
    return useContext(UserContext)
  }
