import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'

type ChatRowProps = {
   id: string
}

function ChatRow({ id }: ChatRowProps) {
   const router = useRouter()
   const pathname = usePathname()
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
   const [isActive, setIsActive] = useState(false)

   useEffect(() => {
      if (!pathname) return

      setIsActive(pathname.includes(id))
   }, [pathname, id])

   const removeChat = async (docId: string) => {
      if (session?.user?.email) {
         await deleteDoc(doc(db, 'users', session?.user?.email, 'chats', docId))
         router.replace('/')
      }
   }

   return (
      <Link
         href={`chat/${id}`}
         className={`chatRow justify-center ${
            isActive ? 'bg-[#343541]' : 'hover:bg-[#2A2B31]'
         }`}
      >
         <ChatBubbleLeftIcon className='h-5 w-5' />
         <p className='flex-1 inline-flex truncate'>
            {messages?.docs[messages.docs.length - 1]?.data().text ||
               'New Chat'}
         </p>
         {isActive && (
            <button
               type='button'
               onClick={() => removeChat(id)}
               className='text-gray-300 hover:text-white'
            >
               <TrashIcon className='h-4 w-4' />
            </button>
         )}
      </Link>
   )
}

export default ChatRow
