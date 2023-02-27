'use client'

import ChatInput from '../../../components/ChatInput'
import Chat from '../../../components/Chat'
import { useThemeContext } from '../../../contexts/ThemeContext'

type ChatPageProps = {
   params: {
      id: string
   }
}

function ChatPage({ params: { id } }: ChatPageProps) {
   const { state } = useThemeContext()

   return (
      <div
         className={`${
            state.mode === 'light' ? 'bg-white' : 'bg-[#343541]'
         } flex flex-1 flex-col h-screen overflow-hidden`}
      >
         <Chat id={id} />
         <ChatInput id={id} />
      </div>
   )
}

export default ChatPage
