import React from 'react'
import Avatar from '@mui/material/Avatar';
const ChatHeader = ({selectedUser}) => {
  
  return (
    <section className='sticky row-end-1 w-full h-16 top-0 border-b-2 border-b-gray bg-gray-light flex-initial cursor-pointer' id='last-seen'>
        <div className='basis-3/12 float-left justify-center grid ml-2'>
        <Avatar salt="Remy Sharp" className='w-10 mx-1 my-3' > {selectedUser.receiverShort} </Avatar>
        </div>
        <div className='basis-9/12 float-left items-center justify-center grid h-full ml-2'>
        <span className='font-bold float-left text-sm'>{selectedUser.receiverUsername}</span>
        <span className='float-right text-gray text-sm -mt-4'>last seen 5 mins ago</span>
        </div>
    </section>
  )
}

export default ChatHeader