import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function ChatInput({onSend,isLoading}) {
    const [text,setText]=useState('')
    function handleSubmit(){
        if(!text.trim() || isLoading )return
        onSend(text)
        setText('')

    }
  return (
    <div className='border-t border-border px-4 py-3'>
        <div className='max-w-3xl mx-auto flex gap-3 '>
            <input type='text' value={text} onChange={
                (e) =>setText(e.target.value)
            } onKeyDown={(e) =>{
                if(e.key==='Enter' && !e.shiftKey){
                    e.preventDefault()
                    handleSubmit()
                }
            }} placeholder='Ask instiGPT' disabled={isLoading}
            className='flex-1 px-4 py-4 rounded-xl bg-input border-border-strong border text-text
            text-sm placeholder:text-faint focus:outline-none transition disabled:opacity-50'/>
            <button onClick={handleSubmit} disabled={isLoading || !text.trim()} className='px-4 py-2.5
           hover:bg-green-300 text-white rounded-xl transition text-sm 
            disabled:opacity-50 disabled:cursor-not-allowed'>
                <FontAwesomeIcon icon={faPaperPlane}  className='text-icon'/>
            </button>

        </div>
      
    </div>
  )
}
