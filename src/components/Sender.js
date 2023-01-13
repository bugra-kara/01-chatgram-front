import React from 'react'
import { BiCheck } from 'react-icons/bi'
const Sender = ({message, messageHour, messageMin}) => {
  return (
    <div className='mx-4 flex h-max flex-row-reverse' id='receiver'>
        <div className='w-3/4 rounded-xl bg-green p-3'>
            <p className=' text-rich-black break-words'>{message}</p>
            <p className='mt-1 text-rich-black'><BiCheck className='float-right ml-1'/> <span className='float-right text-xs'>{messageHour}:{messageMin}</span> </p> 
        </div>
    </div>
  )
}

export default Sender