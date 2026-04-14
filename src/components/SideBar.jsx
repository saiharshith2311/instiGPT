import { faComment, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function SideBar({chats,activeChatId,onSelectChat,onNewChat,onDeleteChat,sidebarOpen}) {

  return (
    <aside className={`w-64 bg-sidebar border-r border-border flex flex-col h-full
      ${sidebarOpen ? 'fixed z-50 top-14 left-0 bottom-0' : 'hidden'} md:relative md:flex md:top-0 md:z-auto`}>
        <div className='p-3'>
            <button onClick={onNewChat} className='w-full flex items-center
             gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-input
             transition text-sm text-text'><FontAwesomeIcon icon={faPlus}/>New Chat</button>
        </div>
        <div className='flex-1 overflow-y-auto px-2 space-y-1'>
            {chats.map(chat =>(
                <div key={chat.id} onClick={()=>onSelectChat(chat.id)}
             className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
              text-sm transition ${
                chat.id === activeChatId
                  ? 'bg-input text-text'
                  : 'text-muted hover:bg-input/50'
              }`}>
                <FontAwesomeIcon icon={faComment}  className='text-xs text-faint'/>
                <span className='flex-1 truncate '>{chat.title}</span>
                <button onClick={(e) =>{ e.stopPropagation() 
                    onDeleteChat(chat.id)}} className='opacity-0 group-hover:opacity-100
                    text-faint hover:text-red-400 transition'>
                        <FontAwesomeIcon icon={faTrash} className='text-xs'/>
                    </button>

        </div>            
            ))}
        </div>
        

    </aside>
  )
}
