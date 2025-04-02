import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPrompt } from '../feature/prompt/promptSlice.js'
import { addUser, addChart, addBot } from '../feature/chat/chatSlice.js'
import { toast } from 'react-toastify'
import sendIcon from '../assets/send.svg'
import axios from 'axios';

const Inputbar = () => {
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const textAreaRef = useRef(null)
  const suggestionsRef = useRef(null)
  const prompt = useSelector((state) => state.prompt.value)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) && 
          textAreaRef.current && !textAreaRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

    // Handle clicks outside suggestions to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
          textAreaRef.current && !textAreaRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!prompt.trim() || prompt.length > 10) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    
    const fetchSuggestions = async () => {
      setIsLoading(true)
      try {
        axios.get('http://localhost:3000/generate', {
          params: {
            q: encodeURIComponent(prompt)
          }
        })
        .then(function (response) {
          const data = response.data;
          console.log(JSON.parse(data.output));
          setSuggestions(JSON.parse(data.output));
        })
        .catch(function (error) {
          console.error('Error fetching data:', error);
        
          setSuggestions([
            {"id": 1, "text": "What are the sales figures for the last month?"},
            {"id": 2, "text": "What are the customer retention rates?"},
            {"id": 3, "text": "What are the marketing expenses for this quarter?"},
            {"id": 4, "text": "What are the growth opportunities in the market?"}
          ]);
        })
        .finally(function () {
          setShowSuggestions(true);
        });
        
      } catch (error) {
        console.error('Failed to fetch suggestions:', error)
        toast.error('Failed to load suggestions')
      } finally {
        setIsLoading(false)
      }
    }

    const delay = setTimeout(() => fetchSuggestions(), 500)
    return () => clearTimeout(delay)
  }, [prompt])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim()) {
      toast.info('Please enter a prompt')
      return
    }
    
    setIsLoading(true)
    try {
      dispatch(addUser(prompt))
      dispatch(addBot("Here are the insights generated from your dataset."))
      dispatch(addChart())
      dispatch(setPrompt(""))
      setShowSuggestions(false)
      toast.success('Your query was processed successfully')
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to process your request')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }
  
  const handleSuggestionClick = (suggestion) => {
    dispatch(setPrompt(suggestion.text))
    setShowSuggestions(false)
    textAreaRef.current.focus()
  }
  
  return (
    <div className='bg-[#2F3143] border-t border-gray-600 p-2 w-full '>
      <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto">
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className='absolute bottom-full mb-2 w-full bg-[#3A3B4F] rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto z-10'
          >
            <ul className='w-full'>
              {suggestions.map((suggestion) => (
                <li 
                  key={suggestion.id}
                  className='px-4 py-2 cursor-pointer hover:bg-[#4A4B5F] text-gray-200 border-b border-gray-700 last:border-0'
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.text}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Input Box */}
        <div className="w-full p-2 border border-gray-600 rounded-xl shadow-md bg-[#2A2C3C] focus:border-[#3C4890]">
          <form className='flex justify-between w-full' onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              placeholder="Ask for insights..."
              className="w-full p-2 outline-none bg-transparent text-gray-200 resize-none placeholder-gray-500 h-12"
              onChange={(e) => dispatch(setPrompt(e.target.value))}
              onKeyDown={handleKeyDown}
              onFocus={() => prompt.trim() && setShowSuggestions(true)}
              disabled={isLoading}
            />
            <button 
              type='submit' 
              className={`flex cursor-pointer justify-center items-center p-2 rounded-full ${isLoading ? 'opacity-50' : 'hover:bg-[#3C4890]'} transition-all`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
              ) : (
                <img src={sendIcon} className='w-6 h-6' alt="Send" />
              )}
            </button>
          </form>
          
          <ModernButtons isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

const ModernButtons = ({ isLoading }) => {
  const handleHistoryClick = () => {
    toast.info('History feature coming soon')
  }

  const handleReasonClick = () => {
    toast.info('Reasoning mode activated')
  }

  const handleMenuClick = () => {
    toast.info('Additional options coming soon')
  }

  return (
    <div className="flex justify-start items-center gap-2 mt-2 pl-1">
      <button 
        className="flex items-center justify-center w-8 h-8 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
        disabled={isLoading}
        onClick={() => toast.info('New conversation started')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      
      <button 
        onClick={handleHistoryClick} 
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        History 
      </button>
      
      <button 
        onClick={handleReasonClick}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 3.5L5.5 7.5L9.5 11.5"></path>
          <path d="M14.5 3.5L18.5 7.5L14.5 11.5"></path>
          <line x1="5.5" y1="15.5" x2="18.5" y2="15.5"></line>
          <line x1="5.5" y1="19.5" x2="18.5" y2="19.5"></line>
        </svg>
        Reason
      </button>
      
      <button 
        onClick={handleMenuClick}
        className="flex items-center justify-center w-8 h-8 text-gray-300 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50"
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
    </div>
  );
};

export default Inputbar