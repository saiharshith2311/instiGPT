import React, { use, useEffect, useState } from 'react'
import Header from './components/Header'
import SideBar from './components/SideBar'
import ChatWindow from './components/ChatWindow'
import { sendMessage } from './utils/gemini'
import AboutPage from './pages/AboutPage'


export default function App() {

    const [chats,setChats]=useState([])
    const [activeChatId,setActiveChatId]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [isDark,setIsDark]=useState(true)
    const [currentPage,setCurrentPage]=useState('chat')
    const [sidebarOpen,setSidebarOpen]=useState(false)

    useEffect(()=>{
        if(isDark){
            document.documentElement.classList.add('dark')

        }else{
            document.documentElement.classList.remove('dark')
        }

    },[isDark])

    useEffect(()=>{
        const saved=localStorage.getItem('instigpt-chats')
        if(saved){
            const parsed=JSON.parse(saved)
            setChats(parsed)
            if(parsed.length>0){
                setActiveChatId(parsed[0].id)
            }
        }
    },[])

    useEffect(()=>{
        if(chats.length>0){
            localStorage.setItem('instigpt-chats',JSON.stringify(chats))
        }
    },[chats])

    const activeChat=chats.find(c =>c.id===activeChatId) || null

    function handleNewChat(){
        const newChat={
            id:'chat_'+Date.now(),
            title:'new chat',
            messages:[]
        }
        setChats(prev =>[newChat,...prev])
        setActiveChatId(newChat.id)
    }
    async function handleSend(text){
        if(!text.trim() || !activeChat.id)return
        const userMessage={role:'user',content:text.trim(),timestamp:Date.now()}
        setChats(prev => prev.map(chat =>chat.id===activeChat.id?{
            ...chat,title:chat.messages.length===0? text.slice(0,30)+'...':chat.title,
            messages:[...chat.messages,userMessage]
        }:chat))
        setIsLoading(true)
        try{
            const currentChat=chats.find(c =>c.id===activeChatId)
            const fullHistory=[...(currentChat?.messages ||[]),userMessage]
            const aiReply=await sendMessage(fullHistory)
            const aiMessage={role :'assistant',content:aiReply,timestamp:Date.now()}
            setChats(prev => prev.map(chat => chat.id===activeChatId ?{...chat,messages:
                [...chat.messages,aiMessage]
            }:chat))
        }catch (error){
            console.error('Gemini error:',error)
            const errorMessage={role :'assistant',content:'Sorry,An unknown error occured.Try Again.',
                timestamp:Date.now()
            }
            setChats(prev =>prev.map(chat => chat.id===activeChatId ?{
                ...chat,messages:[...chat.messages,errorMessage]
            }:chat))
        }
        setIsLoading(false)

        

    }
    function handleDeleteChat(chatId){
            setChats(prev =>prev.filter(c=>c.id!=chatId))
            if(activeChatId===chatId){
                setActiveChatId(chats.length>1?chats.find(c => c.id !==chatId)?.id:null)
            }
        }
  return (
    <div className='h-screen flex flex-col overflow-hidden'>
        <Header isDark={isDark} onToggleTheme={() =>setIsDark(!isDark)} currentPage={currentPage} onNavigate={setCurrentPage}
            onHomeClick={() =>{setCurrentPage('chat'); setActiveChatId(null)}} 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
            <div className='flex flex-1 overflow-hidden'>
                <SideBar chats={chats} activeChatId={activeChatId} onSelectChat={(id) => {setActiveChatId(id); setSidebarOpen(false)}}
                onNewChat={() => {handleNewChat(); setSidebarOpen(false)}} onDeleteChat={handleDeleteChat} sidebarOpen={sidebarOpen}/>
                <main className='flex-1  flex-col flex overflow-hidden'>
                    {currentPage === 'about' 
    ? <AboutPage /> 
    : <ChatWindow chat={activeChat} isLoading={isLoading} onSend={handleSend} onNewChat={handleNewChat} />
  }

                </main>
            </div>

      
    </div>
  )
}
