import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun,faMoon ,faHome, faBars} from '@fortawesome/free-solid-svg-icons'

export default function Header({isDark,onToggleTheme,currentPage,onNavigate,onHomeClick,onToggleSidebar}) {

  return (
    <header className='h-14 flex items-center justify-between px-3 md:px-5 bg-surface shrink-0 border-b border-border'>
        <div className='flex items-center gap-2'>
            <button onClick={onToggleSidebar} className='md:hidden p-2 rounded-lg hover:bg-input text-text'>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <img src="https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" 
          alt="IITM" 
          className="h-8 w-8"/>
          <h1 className='font-extrabold text-sm md:text-base'>instiGPT</h1>

        </div>

        <div className='flex items-center gap-1 md:gap-2'>
        <button onClick={onHomeClick} className={`px-2 md:px-4 py-1.5 text-sm md:text-base rounded-lg transition-colors flex items-center gap-1.5 mr-2 md:mr-6 font-bold
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
          className={`px-2 md:px-3 py-1.5 text-sm md:text-base rounded-lg transition-colors mr-2 md:mr-6 font-bold
            ${currentPage === 'about' 
              ? 'text-text bg-input font-semibold' 
              : 'text-text hover:bg-input'
            }`}
        >
          About Us
        </button>
        <button onClick={onToggleTheme} className='p-2 rounded-lg 
        hover:bg-input transition text-muted'>
            <FontAwesomeIcon icon={isDark?faSun:faMoon} className='text-2xl'/>
        </button>
        </div>
    </header>
  )
}
