import ChatInput from '../../../components/ChatInput'
import Chat from '../../../components/Chat'

type ChatPageProps = {
   params: {
      id: string
   }
}

function ChatPage({ params: { id } }: ChatPageProps) {
   return (
      <div className='flex flex-col h-screen overflow-hidden'>
         <Chat id={id} />
         <ChatInput id={id} />
      </div>
   )
}

export default ChatPage
