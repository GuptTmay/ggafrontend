import React from 'react'
import Inputbar from '../components/Inputbar'
import ChatArea from '../components/chat/ChatArea'
import Navbar from '../components/Navbar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-between h-screen w-screen'>
        <Navbar />
        <ChatArea />
        <Inputbar />
    </div>
  )
}

export default Hero