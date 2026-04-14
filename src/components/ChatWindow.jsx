import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'
import ChatInput from './ChatInput'
import MessageBubble from './MessageBubble'

export default function ChatWindow({chat,isLoading,onSend,onNewChat}) {
    const bottomRef=useRef(null)
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behaviour:'smooth'})
    },[chat?.messages])
    if(!chat){
        return (
            <div className='h-full flex flex-col items-center justify-center text-center py-4'>
                <FontAwesomeIcon icon={faRobot} className='text-5xl text-icon  mb-4'/>
                <h2 className='text-2xl font-semibold text-text mb-2'>Welcome to instiGPT</h2>
                <p className='text-muted mb-6'>Your Assistant </p>
                <button 
                    onClick={onNewChat}
                    className='px-5 py-2.5 border border-border-strong bg-transparent text-icon rounded-lg 
                        hover:bg-input transition text-sm font-medium'>
                    + New Chat
                </button>

            </div>
        )
    }
  return (
    <>
    <div className='flex-1 overflow-y-auto px-4 py-6'>
        <div className='max-w-3xl mx-auto space-y-4'>
            {chat.messages.length===0 && (
                <div className='text-center py-20'>
                    <FontAwesomeIcon icon={faRobot} className='text-4xl text-icon mb-3'/>
                    <h3 className='text-lg font-medium text-text mb-1'>How can I help you?</h3>
                    <p className='text-muted text-sm mb-6'>Ask me anything about IITM</p>
                    <button 
                        onClick={onNewChat}
                        className='px-5 py-2.5 border border-border-strong text-icon rounded-lg 
                            hover:bg-input transition text-sm font-medium'>
                        + New Chat
                    </button>
                </div>
            )}
            {chat.messages.map((msg,index) =>(
                <MessageBubble key={index} message={msg} />

            ))}
            {isLoading && (
                <div className='flex items-center gap-2 text-muted text-sm py-2'>
                    <div className='flex gap-1'>
                        <span className='w-2 h-2 bg-primary rounded-full animate-bounce'/>
                        <span className='w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.15s]'/>
                        <span className='w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.3s]'/>
                        </div>
                        <span>Thinking..</span>
                        </div>
            )}
            <div ref={bottomRef}/>
        </div>
      
    </div>
    <ChatInput onSend={onSend} isLoading={isLoading}/>
    </>
  )
}
