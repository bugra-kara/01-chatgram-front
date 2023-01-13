import React from 'react'
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useUserContext } from '../context/userContext';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
const ChatMessages = ({receiverUsername, receiverShort, chatId, receiverId, isOnline, lastMessage, unReadedMsg}) => {
  const { selectUser } = useUserContext()
  if(lastMessage === undefined) {
    return (
      <section className='pl-4 grid grid-cols-12 gap-3 cursor-pointer hover:bg-black hover:bg-opacity-10 shadow-[0_2px_0_0_rgba(0,0,0,0.1)]'
        onClick={()=> selectUser({chatId, receiverUsername, receiverShort, receiverId})} id='chat'>
        <div className=' col-start-1 col-end-3 justify-center'>
        { isOnline 
          ? <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            className='mx-1 my-3'
        >
        <Avatar salt="Remy Sharp" sx={{ width: 45, height: 45}}> {receiverShort} </Avatar>
        </StyledBadge> 
          : <Avatar className='mx-1 my-3' salt="Remy Sharp" sx={{ width: 45, height: 45}}> {receiverShort} </Avatar> }
        
        </div>
        <div className=' col-start-3 col-end-12 self-center ml-2 grid grid-rows-2 w-full'>
            <div className='w-full row-start-1 row-end-1 self-center'>
            <div className='font-bold float-left'>{receiverUsername}</div>
            <div className='float-right text-gray text-sm'>{ lastMessage !== undefined ? lastMessage.messageHour : "" }:{lastMessage !== undefined ? lastMessage.messageMin : ""}</div>
            </div>
            <div className='w-full row-start-2 row-end-2 self-center '>
            <div className='float-left text-gray'>
            </div>
            {unReadedMsg > 0 ? <div className='float-right rounded-full flex items-center justify-center h-5 w-5 bg-green '>
            <span className='self-center text-gray-light flex text-sm'>{unReadedMsg}</span>
            </div> : ""}
            </div>
        </div>
    </section>
    )
  }
  return (
    <section className='pl-4 grid grid-cols-12 gap-3 cursor-pointer hover:bg-black hover:bg-opacity-10 shadow-[0_2px_0_0_rgba(0,0,0,0.1)]'
        onClick={()=> selectUser({chatId, receiverUsername, receiverShort, receiverId})} id='chat'>
        <div className=' col-start-1 col-end-3 justify-center'>
        { isOnline 
          ? <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            className='mx-1 my-3'
        >
        <Avatar salt="Remy Sharp" sx={{ width: 45, height: 45}}> {receiverShort} </Avatar>
        </StyledBadge> 
          : <Avatar className='mx-1 my-3' salt="Remy Sharp" sx={{ width: 45, height: 45}}> {receiverShort} </Avatar> }
        
        </div>
        <div className=' col-start-3 col-end-12 self-center ml-2 grid grid-rows-2 w-full'>
            <div className='w-full row-start-1 row-end-1 self-center'>
            <div className='font-bold float-left'>{receiverUsername}</div>
            {
              lastMessage.message !== "" ? <div className='float-right text-gray text-sm'>{ lastMessage !== undefined ? lastMessage.messageHour : "" }:{lastMessage !== undefined ? lastMessage.messageMin : ""}</div> : ""
            }
            </div>
            <div className='w-full row-start-2 row-end-2 self-center '>
            <div className='float-left text-gray'>
              { lastMessage.message !== "" && lastMessage.message.length > 34
                ? `${lastMessage.message.slice(0,35)}...`
                : lastMessage.message
              }
            </div>
            {unReadedMsg > 0 ? <div className='float-right rounded-full flex items-center justify-center h-5 w-5 bg-green '>
            <span className='self-center text-gray-light flex text-sm'>{unReadedMsg}</span>
            </div> : ""}
            </div>
        </div>
    </section>
  )
}

export default ChatMessages