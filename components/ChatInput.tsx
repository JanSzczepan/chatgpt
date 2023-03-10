'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'
import { Message } from '../typings'
import { db } from '../firebase'
import { useThemeContext } from '../contexts/ThemeContext'

type ChatInputProps = {
   id: string
}

function ChatInput({ id }: ChatInputProps) {
   const { state } = useThemeContext()
   const { data: session } = useSession()
   const [prompt, setPropmpt] = useState('')

   const { data: model } = useSWR('model', {
      fallbackData: 'text-davinci-003',
   })

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPropmpt(e.target.value)
   }

   const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!prompt || !session?.user?.email || !session?.user?.name) return

      const inputValue = prompt.trim()
      setPropmpt('')

      const message: Message = {
         text: inputValue,
         createdAt: serverTimestamp(),
         user: {
            _id: session?.user?.email,
            name: session?.user?.name,
            avatar:
               session?.user?.image ||
               `https://ui-avatars.com/api/?name=${session?.user?.name}}`,
         },
      }

      await addDoc(
         collection(db, 'users', session.user.email, 'chats', id, 'messages'),
         message
      )

      const notification = toast.loading('ChatGPT is thinking...')

      await fetch('/api/askQuestion', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ prompt: inputValue, id, model, session }),
      }).then(() => {
         toast.success('ChatGPT has responded!', { id: notification })
      })
   }

   return (
      <div
         className={`${
            state.mode === 'light'
               ? 'bg-white text-[#343541] border-[1px] border-[#E5E5E5] drop-shadow-[0_0_10px_rgba(0,0,0,0.05)]'
               : 'bg-[#40414F] text-white'
         } rounded-lg text-sm mx-10 my-5`}
      >
         <form
            className='px-5 py-2 flex space-x-5'
            onSubmit={sendMessage}
         >
            <input
               className='flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300'
               type='text'
               value={prompt}
               onChange={handleChange}
               disabled={!session}
               placeholder='Type your message here...'
            />
            <button
               className={`${
                  state.mode === 'light'
                     ? 'hover:bg-[#F7F7F8] text-[#8E8E9F]'
                     : 'hover:bg-[#202123] text-[#ACACBD]'
               } px-3 py-2 font-bold rounded disabled:cursor-not-allowed`}
               type='submit'
               disabled={!prompt || !session}
            >
               <PaperAirplaneIcon className='h-5 w-5 -rotate-45' />
            </button>
         </form>
      </div>
   )
}

export default ChatInput
