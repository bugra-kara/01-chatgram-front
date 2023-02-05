import React, { useEffect } from 'react'
import { useAuthContext } from '../context/authContext'
import { useUserContext } from '../context/userContext';
import { FaSignOutAlt } from 'react-icons/fa'
import { AiOutlineUserAdd } from 'react-icons/ai'
import Tooltip from '@mui/material/Tooltip';
import { ChatMessages } from '.'
const ChatUsers = ({socket, sendMessage, onlineUsers, modalOpen}) => {
    const { handleQuit, state } = useAuthContext()
    const { chats, getAllChatsContext, isSelect, newMsg, logoutUser, userAdded } = useUserContext()
    const quitUser = (e) => {
        e.preventDefault()
        socket.current.disconnect()
        logoutUser()
        handleQuit()
    }
    useEffect(()=> {
        if(!isSelect || newMsg || userAdded) {
            getAllChatsContext(state.userId)
        }
    },[sendMessage, state.userId, userAdded])
    return (
        <div className='w-full sm:basis-8/12 md:basis-5/12 lg:basis-4/12 xl:basis-3/12 relative overflow-hidden'>
            <section className='grid grid-cols-6 gap-4 mx-4 my-3 sticky top-0 h-10 w-full items-center' id='search-bar'>
                <div className='col-start-1 col-end-1 justify-self-center'>
                    <Tooltip title="Çıkış" enterDelay={500} placement="bottom-start">
                        <button className='m-1' onClick={(e)=> quitUser(e)}><FaSignOutAlt/></button>
                    </Tooltip>
                </div>
                <div className='col-start-2 col-end-6 justify-left'>
                <form className='w-full'>
                    <div className='relative flex'>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className='w-5 h-5 text-gray' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" name="a" id="" placeholder='Search' className='p-1 pl-12 text-sm text-gray-900 w-full bg-light-gray rounded-xl'/>
                    </div>
                </form>
                </div>
                <div className='col-start-6 col-end-6 '>
                    <Tooltip title="Arkadaş Ekle" enterDelay={500} placement="bottom-start">
                        <button className='m-1' onClick={(e)=>modalOpen(e)}><AiOutlineUserAdd/></button>
                    </Tooltip>
                </div>
            </section>
            <section className='overflow-y-auto overflow-hidden h-full pb-16'>
                {
                    chats?.map((item, index)=> {
                        let isOnline = onlineUsers.some((user)=> user.userId === item.receiverId)
                        return (
                            <ChatMessages key={index} {...item} isOnline={isOnline}/>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default ChatUsers