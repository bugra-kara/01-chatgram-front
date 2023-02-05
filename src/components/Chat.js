import React, { useRef, useEffect } from 'react'
import { Sender, Receiver, ChatHeader, MessageBar } from '.'
import { useAuthContext } from '../context/authContext'
import { useUserContext } from '../context/userContext'
const Chat =({setSendMessage}) => {
    const { selectedUser, selectedChat, newMessage } = useUserContext()
    const { state } = useAuthContext()
    const messagesEndRef = useRef()
    const messageSent = async(message, chatId, receiverId, senderId) => {
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
        newMessage(message, chatId, receiverId, senderId)
        setSendMessage([...messageInfo])
    }
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }
    
    useEffect(() => {
        scrollToBottom()
    }, [selectedChat]);
        return (
            <div className=' relative grid grid-rows-6 gap-0 sm:basis-4/12 md:basis-7/12 lg:basis-8/12 xl:basis-9/12 sm:flex sm:flex-col bg-iceberg-blue bg-opacity-20 overflow-y-auto'>
                <ChatHeader selectedUser={selectedUser.selectedUserData}/>
                <section className='grid row-start-1 row-end-7 overflow-y-auto h-full pb-1'>
                    <section className='flex flex-col space-y-4 overflow-y-auto pt-1'>
                    {
                        selectedChat.map((item, index)=> {
                            return (
                                item.senderId === state.userId
                                ? <Sender key={index} message={item.message} messageHour={item.messageHour} messageMin={item.messageMin}/>
                                : <Receiver key={index} message={item.message} messageHour={item.messageHour} messageMin={item.messageMin} />
                            )
                        })
                    }
                    <div ref={messagesEndRef} className="h-0"></div>
                    </section>
                </section>
                <MessageBar selectedUser={selectedUser.selectedUserData} messageSent={messageSent}/>
                </div>
        )

    }

export default Chat