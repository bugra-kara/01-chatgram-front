import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { GET_ALL_CHATS, SELECT_USER, GET_ONE_CHAT, NEW_MESSAGE, USER_LOGOUT, FRIEND_REQUEST, FRIEND_RESPONSE, FRIEND_ADDED } from '../utils.js/actions'
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
    const getAllChatsContext = async (id) => {
      try {
        if(id !== null) {
            const resp = await axios.get(`https://chatgram.onrender.com/api/v1/chats/${id}`,{withCredentials: true})
            dispatch({type: GET_ALL_CHATS, payload: resp.data.data})
        }
      } catch (error) {
        console.log(error);
      }
    }
    const getOneChatContext = async (resp) => {
      dispatch({type: GET_ONE_CHAT, payload: resp})
    }
    const getAllMessages = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const resp = await axios.get(`https://chatgram.onrender.com/api/v1/chats/users/${state.selectedUser.selectedUserData.chatId}?userId=${userId}`,{withCredentials: true})
        getOneChatContext(resp)
      } catch (error) {
        console.log(error);
      }
    }
    const newMessage = async (message, chatId, receiverId, senderId, isReceive) => {
      const date = new Date()
        const day = date.getDate()
        const min = date.getMinutes()
        let hour = date.getHours()
        if(hour === 0) {
            hour = 12
        }
        const messageInfo= [
            {
                message: message,
                senderId: senderId,
                receiverId: receiverId,
                messageHour: hour,
                messageMin: min,
                messageDate: day,
                date: date,
                chatId: chatId
            }
        ]
      try {
          if(!isReceive) {
            await Promise.all([
              axios.patch(`https://chatgram.onrender.com/api/v1/chats/chat/${chatId}`, {messages: messageInfo, lastMessage: messageInfo}, {withCredentials: true}),
              axios.patch(`https://chatgram.onrender.com/api/v1/chats/users/${chatId}`, {lastMessage: {
                message: message,
                senderId: senderId,
                receiverId: receiverId,
                messageHour: hour,
                messageMin: min,
                messageDate: day,
                date: date
            }}, {withCredentials: true})
            ])
          }
          const newData = [...messageInfo]
          dispatch({type: NEW_MESSAGE, payload:newData})
      } catch (error) {
          console.log(error);
      }
    }
    const logoutUser = () => {
      dispatch({type: USER_LOGOUT})
    }
    const friendReq = async (data) => {
      try {
        await axios.patch(`https://chatgram.onrender.com/api/v1/users/friend/req`,{userId: data},{withCredentials: true})
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
      if(payload.ask === 'accept'){
        try {
          const user = localStorage.getItem('userId')
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
          await axios.patch(`https://chatgram.onrender.com/api/v1/users/friend/resReject`,{fId: payload.id},{withCredentials: true})
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
        getAllMessages()
      }
    },[state.isChat])
    return (
        <UserContext.Provider value={{...state, socketFriendRes, getFriendReq, friendReq, friendRes, getAllChatsContext, selectUser, getOneChatContext, newMessage, logoutUser}}>{children}</UserContext.Provider>
      )
}

// make sure use
export const useUserContext = () => {
    return useContext(UserContext)
  }
