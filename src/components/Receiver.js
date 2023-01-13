import React from 'react'
import { BiCheck } from 'react-icons/bi'

const Receiver = ({message, messageHour, messageMin}) => {
  return (
    <div className='mx-4 flex h-max' id='sender'>
        <div className='w-3/4 rounded-xl bg-white px-3 py-2'>
            <p className=' text-rich-black break-words'>{message}</p>
            <p className='mt-1 text-rich-black'><BiCheck className='float-right ml-1'/> <span className='float-right text-xs'>{messageHour}:{messageMin}</span> </p> 
        </div>
    </div>
  )
}

export default Receiver