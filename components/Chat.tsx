'use client'

import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import Message from './Message'
import { useThemeContext } from '../contexts/ThemeContext'

type ChatProps = {
   id: string
}

function Chat({ id }: ChatProps) {
   const { state } = useThemeContext()
   const { data: session } = useSession()
   const [messages] = useCollection(
      session &&
         query(
            collection(
               db,
               'users',
               session?.user?.email || '',
               'chats',
               id,
               'messages'
            ),
            orderBy('createdAt', 'asc')
         )
   )

   return (
      <div className='flex-1 overflow-y-auto overflow-x-hidden'>
         {messages?.empty && (
            <div
               className={`${
                  state.mode === 'light' ? 'text-[#343541]' : 'text-white'
               }`}
            >
               <p className='mt-10 text-center'>
                  Type a prompt in below to get started!
               </p>
               <ArrowDownCircleIcon className='h-10 w-10 mx-auto mt-5 animate-bounce' />
            </div>
         )}
         {messages?.docs.map((message) => (
            <Message
               key={message.id}
               message={message.data()}
            />
         ))}
      </div>
   )
}

export default Chat
