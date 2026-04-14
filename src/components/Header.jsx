import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun,faMoon ,faHome} from '@fortawesome/free-solid-svg-icons'

export default function Header({isDark,onToggleTheme,currentPage,onNavigate,onHomeClick,chatTitle}) {

  return (
    <header className='h-17 flex items-center justify-between px-5 bg-surface shrink-0 border-b border-border'>
        <div className='flex items-center gap-3 '>
            <img src="https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" 
          alt="IITM" 
          className="h-8 w-8"/>
          <h1 className='font-extrabold '>instiGPT</h1>

        </div>

        <div className='flex items-center gap-1 mr-4'>
        <button onClick={onHomeClick} className={`px-4 py-1.5 text-base rounded-lg transition-colors flex items-center gap-1.5 mr-50 font-bold
            ${currentPage === 'chat' 
              ? 'text-text bg-input font-semibold' 
              : 'text-text hover:bg-input'
            }`}
        >
          <FontAwesomeIcon icon={faHome} className="text-sm" />
          Home
        </button>
        <button
          onClick={() => onNavigate('about')}
          className={`px-3 py-1.5  text- rounded-lg transition-colors mr-50 font-bold
            ${currentPage === 'about' 
              ? 'text-text bg-input font-semibold' 
              : 'text-text hover:bg-input'
            }`}
        >
          About Us
        </button>
        <button onClick={onToggleTheme} className='p-2 rounded-lg 
        hover:bg-input transition text-muted mr-30'>
            <FontAwesomeIcon icon={isDark?faSun:faMoon} className='text-2xl'/>
        </button>
        </div>
    </header>
  )
}
