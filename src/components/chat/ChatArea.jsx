import React from 'react'
import BotText from './BotText'
import UserText from './UserText'
import Charts from './Charts'
import { useSelector } from 'react-redux'

const ChatArea = () => {
  const prompt = useSelector(state => state.prompt.value)
  const messages = useSelector(state => state.chat.messages)
  return (
  <div className='overflow-auto scroll-smooth w-full h-screen bg-[#34374B]'>
    <ul className='flex flex-col items-center justify-start sm:p-4 gap-4'>
        {messages.map((msg) => {
          let comp
          switch (msg.sender) {
            case "user":
              comp = <UserText key={msg.id} text={msg.text} /> 
              break
            case "bot":
              comp = <BotText key={msg.id} text={msg.text} /> 
              break
            case "server":
              comp = <Charts key={msg.id} myKey={msg.id}></Charts>
              break
            default:
              comp = null
          }
          return comp
        })} 
      {prompt !== "" && <UserText text={prompt}></UserText>}
    </ul>    
  </div>
  )
}

export default ChatArea