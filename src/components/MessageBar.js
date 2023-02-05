import React, { useState } from 'react'
import {FaRegSmileBeam} from 'react-icons/fa'
import {IoMdSend} from 'react-icons/io'

const MessageBar = ({selectedUser, messageSent}) => {
    const [message, setMessage] = useState("")
    const handleSubmit = (e, message,chatId, receiverId) => {
        e.preventDefault()
        const senderId = localStorage.getItem('userId')
        messageSent(message, chatId, receiverId, senderId)
        setMessage("")
    }
  return (
    <section className='h-12 row-start-7 row-end-7 w-auto my-2 px-4 space-y-reverse '>
        <form action="" onSubmit={(e)=>handleSubmit(e,message, selectedUser.chatId, selectedUser.receiverId)}>
            <button className='absolute cursor-pointer my-3 left-8 md:left-10 lg:left-8 xl:left-8 sm:left-22'><FaRegSmileBeam className='h-5 w-5'/></button>
            <button type='submit' className='absolute cursor-pointer my-3 right-8 md:right-10 lg:right-8 xl:right-10 sm:right-22'><IoMdSend className='h-5 w-5'/></button>
            <input type="text" name="" id="" placeholder='Message' className='pl-12 h-12 rounded-xl w-full' value={message} onChange={(e)=>setMessage(e.target.value)}/>
        </form>
    </section>
  )
}

export default MessageBar