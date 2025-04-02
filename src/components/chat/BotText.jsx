import React from 'react'
import gear from '../../assets/gear64.png'

const BotText = ({ text }) => {
  return (
    <div className='self-start flex flex-col justify-center items-start gap-1'>
      <div className='flex justify-center items-center gap-2'>
        <div className='h-9 w-9 border-stone-500 border-1 rounded-xl rounded-bl-none p-1 bg-gray-900'>
          <img src={gear} alt="gear icon" />
        </div>
        <span className='text-zinc-400 font-sans text-sm'>Insight Gear</span>
      </div>
      <div className='border-stone-500 border-1 rounded-xl rounded-tl-none py-1.5 px-2 max-w-xl bg-gray-900 text-zinc-200' >
        <p className='overflow-hidden resize-none'
            onInput={(e) => {
              e.target.style.height = "auto"; 
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
        >{text}</p>
      </div>
      <div className='flex justify-start items-center ml-0.5'>
          <span className='text-zinc-400 font-sans text-sm'>{new Date().toLocaleDateString() + "  " + new Date().toLocaleTimeString()}</span>
      </div>   
    </div>
  )
}

export default BotText