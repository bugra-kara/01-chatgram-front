import React, {useEffect, useMemo, useRef, useState} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { ChatUsers, Chat, FriendModal } from '../components'
import { useUserContext } from '../context/userContext'
import { io } from "socket.io-client";
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
const Home = () => {
  const { state } = useAuthContext()
  const { selectedUser, newMessage, getFriendReq, userAdded, socketFriendRes, addedUserId, receivedMsg } = useUserContext()
  const [sendMessage, setSendMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState("")
  const [result, setResult] = useState(null)
  const { friendReq } = useUserContext()
  const socket = useRef()
  
  const modalOpen = (e) => {
    e.preventDefault()
    setModal(!modal)
    getFriendReq(state.userId)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleReq = (payload) => {
    payload.e.preventDefault()
    const newResult = result.map((item)=> {
      if(item._id === payload.item) {
        return {...item, isSent: true}
      }
      else {
        return {...item}
      }
    })
    setResult(newResult)
    friendReq(payload.item)
  }
  const debounce = () => {
    let timeoutId;
    return (e) => {
      setSearch(e.target.value)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(async ()=> {
        const resp = await axios.get(`http://localhost:5000/api/v1/users/search?search=${e.target.value}&userId=${state.userId}`,{withCredentials: true})
        setResult(resp.data.data)
      }, 1000)
    }
  }
  const optimizedDebounce = useMemo(()=> debounce(), [])
  useEffect(()=> {
    socket.current = io('http://localhost:5000')
    if(state.userId !== null){
      socket.current.emit('new-user-add', state.userId)
    }
    socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
  },[state.userId])
  useEffect(()=> {
    if(sendMessage !== null) {
        socket.current.emit('send-msg', sendMessage)
    }
  },[sendMessage])
  useEffect(()=> {
    if(!receivedMsg){
        socket.current.on('receive-message', (data)=> {
            const {message, chatId, receiverId, senderId} = data[0][0]
            newMessage(message, chatId, receiverId, senderId, true)
        })
    }
  },[])
  useEffect(()=> {
    if(userAdded) {
      socket.current.emit('accep-friend', addedUserId)
    }
  },[userAdded])
  useEffect(()=> {
    if(socket.current && !userAdded){
      socket.current.on('receive-friend',(userId)=> {
        if(userId === state.userId) {
          socketFriendRes()
        }
      })
    }
  },[])
  const username  = localStorage.getItem('username')
  const userId = localStorage.getItem('userId')
  if(username === null || userId === null ) {
    return <Navigate to="/login"/>
  }
  else {
    return (
      <>
      {modal ? <FriendModal handleReq={handleReq} result={result} modalOpen={modalOpen} handleSubmit={handleSubmit} optimizedDebounce={optimizedDebounce} search={search}/> : ""}
      <main className='-mt-2'>
        <div className='container-xl mx-0 mt-2 grid-cols-2 flex flex-row h-screen p-3'>
          <ChatUsers socket={socket} sendMessage={sendMessage} onlineUsers={onlineUsers} modalOpen={modalOpen}/>
          {selectedUser !== null ? <Chat setSendMessage={setSendMessage} /> : ""}
        </div>
        <ToastContainer/>
        <Outlet/>
      </main>
      </>
    )
  }
}

export default Home