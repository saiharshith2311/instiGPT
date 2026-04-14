import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown'

export default function MessageBubble({ message }) {
    const isUser = message.role === 'user'

    return (
        <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            
            
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-border-strong flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faRobot} className="text-text text-sm" />
                </div>
            )}

          
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                ${isUser ? 'bg-user-bubble text-bubble-text rounded-br-sm' : 'bg-ai-bubble text-text rounded-bl-sm'}`}>
                {isUser
                    ? <p>{message.content}</p>
                    : <Markdown>{message.content}</Markdown>
                }
            </div>

           
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-border-strong flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faUser} className="text-text text-sm" />
                </div>
            )}
        </div>
    )
}
