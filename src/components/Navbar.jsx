import React from 'react'
import { Avatar } from '@mui/material'
import avatar from '../assets/cool.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import gear from '../assets/gear64.png'

const HeroNavbar = () => {
  return (
    <div className='flex justify-between items-center w-full pt-3 pb-2 px-8 bg-gray-800'>
      <div className='flex '>
        <FontAwesomeIcon icon={faBars} size='2xl' className='active:scale-110 cursor-pointer' style={{color: "#d1d5dc",}} />
        <span className="inline-flex items-center text-lg font-semibold cursor-pointer text-gray-300 ml-3">
          <span className="text-lime-400"><span className='text-2xl'>I</span>nsight</span>
          <span className='text-gray-300'><span className='text-2xl'>G</span>ear</span>
        </span>
      </div>

      <div className='flex justify-center items-center gap-4'>
         <button className="sm:flex items-center hidden gap-2 px-4 py-2 cursor-pointer active:scale-110 rounded-full bg-[#222] text-white text-sm font-medium border border-[#444] shadow-[0px_0px_10px_rgba(255,255,255,0.2)] hover:bg-[#333] transition">
          <span className="w-5 h-5 animate-pulse">
            <img src={gear} alt="icons" />
          </span>
          Try Insight Gear Advanced
        </button> 
        <div className='active:scale-110 cursor-pointer'>
          <FontAwesomeIcon className='w-6 p-2 hover:bg-[#36394E] rounded-full active:bg-[#40435D]' icon={faEllipsisV} size='xl' color='white' />
        </div>
        <Avatar alt='Profile Image' className='active:scale-110 cursor-pointer hover:shadow-[2px_2px_10px_rgba(255,255,255,0.6)]' src={avatar} sx={{width: 40, height: 40}}></Avatar>
      </div>
    </div>
  )
}


export default HeroNavbar