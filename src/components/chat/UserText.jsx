import React from 'react'
import cool from '../../assets/cool.png'

const UserText = ({ text }) => {
  return (
      <div className='flex flex-col items-end justify-center self-end gap-1'>
        <div className='flex justify-end items-center gap-2'>
          <span className='text-zinc-400 font-sans text-sm'>Insight User</span>
          <div className='h-9 w-9 border-stone-500 border-1 rounded-xl rounded-br-none p-1 bg-gray-900'>
            <img src={cool} alt="gear icon" />
        </div>
        </div>
        <div className='border-stone-500 border-1 rounded-xl rounded-tr-none py-1.5 px-2 max-w-xl bg-gray-900 text-zinc-200' >
          <p className='overflow-hidden resize-none max-w-2xl'
              onInput={(e) => {
                e.target.style.height = "auto"; 
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
          >{text}</p>
        </div>
        <div className='flex justify-end items-center m-1'>
          <span className='text-zinc-400 font-sans text-sm'>{new Date().toLocaleDateString() + "  " + new Date().toLocaleTimeString()}</span>
        </div>
      </div>
  )
}

const NowDate = () => {
  const now = new Date()
  console.log(now.getTime)
  return now.getTime();
}

export default UserText