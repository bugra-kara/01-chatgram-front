import React, { useState } from 'react'
import { GrFormClose } from 'react-icons/gr'
import { FcCheckmark } from 'react-icons/fc'
import { RiCloseFill } from 'react-icons/ri'
import { BiPlus } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import {MdPersonAddAlt1, MdOutlineDone} from 'react-icons/md'
import { useUserContext } from '../context/userContext'
const FriendModal = ({modalOpen, handleSubmit, optimizedDebounce, search, result, handleReq}) => {
  const {friendsReq} = useUserContext((state)=> state.friendsReq)
  const { friendRes } = useUserContext()
  const [page, setPage] = useState(true)
  const handleChange = ()=> {
    setPage(!page)
  }
  if(page) {
    return (
      <>
      <div className="py-12 transition bg-rich-black bg-opacity-30 duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 ">
        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <button onClick={handleChange}><span><FaUserFriends/></span></button>
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4 text-center">Arkadaş Ekle</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <input id="name" 
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded-md border"
            placeholder="bugrakara" value={search} onChange={optimizedDebounce}/>
            </form>
            <div className='container flex-1 flex-col space-y-2 overflow-y-auto overflow-hidden h-80 self-center '>
              {
                result !== null ? result !== undefined ? result.length > 0 ? result.map((item, index)=> {
                    return (
                      <div key={index} className='flex space-x-3 bg-gray bg-opacity-10 w-full py-2 px-3 rounded-md'>
                        <span className='float-left flex w-full'>{item.username}</span>
                        <div className='flex flex-row space-x-6 self-center'>
                        {
                          item.isSent ? <button type='submit' disabled className=' border-2 p-0.5 rounded-md bg-gray bg-opacity-20'>
                          <span className='flex basis-1/2'><MdOutlineDone/></span>
                        </button> :<button type='submit' className=' border-2 p-0.5 rounded-md bg-gray-light pointer-events-auto' onClick={(e)=>handleReq({e, item: item._id})}>
                          <span className='flex basis-1/2'><BiPlus/></span>
                        </button>
                        }
                        </div>
                      </div>
                    )
                  }) : <div className='flex space-x-3 bg-gray bg-opacity-10 w-full py-2 px-3 rounded-md'>
                        <span className='float-left flex w-full'>User Not Found</span>                      
                      </div> : "" : ""
              }
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={modalOpen} >
                <GrFormClose />
            </button>
          </div>
        </div>
      </div>
    </>
    )
  }
  return (
    <>
      <div className="py-12 transition bg-rich-black bg-opacity-30 duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 ">
        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <button onClick={handleChange}><span><MdPersonAddAlt1/></span></button>
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4 text-center">Arkadaş İstekleri</h1>
            
            <div className='container flex-1 flex-col space-y-2 overflow-y-auto overflow-hidden h-80 self-center '>
              {
                friendsReq !== null ? friendsReq !== undefined ? friendsReq.map((item, index)=> {
                    return (
                      <div key={index} className='flex space-x-3 bg-gray bg-opacity-10 w-full py-2 px-3 rounded-md'>
                        <span className='float-left flex w-full'>{item.username}</span>
                        <div className='flex flex-row space-x-6 self-center'>
                        <button type='submit' name='accept' onClick={()=>friendRes({ask: "accept", id: item.userId})}>
                          <span className='flex basis-1/2'><FcCheckmark /></span>
                        </button>
                        <button type='submit' name='reject' onClick={(e)=>friendRes({ask: "reject", id: item.userId})}>
                          <span className='flex basis-1/2'><RiCloseFill className=' text-red' /></span>
                        </button>
                        </div>
                      </div>
                    )
                  }) : "" : ""
              }
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={modalOpen} >
                <GrFormClose />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FriendModal