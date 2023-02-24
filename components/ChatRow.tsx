import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { collection } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'

type ChatRowProps = {
   id: string
}

function ChatRow({ id }: ChatRowProps) {
   const pathname = usePathname()
   const { data: session } = useSession()
   const [messages] = useCollection(
      session &&
         collection(
            db,
            'users',
            session?.user?.email || '',
            'chats',
            id,
            'messages'
         )
   )
   const [isActive, setIsActive] = useState(false)

   useEffect(() => {
      if (!pathname) return

      setIsActive(pathname.includes(id))
   }, [pathname, id])

   return (
      <Link
         href={`chat/${id}`}
         className={`chatRow justify-center ${isActive && 'bg-gray-700/50'}`}
      >
         <ChatBubbleLeftIcon className='h-5 w-5' />
         <p className='flex-1 inline-flex truncate'>
            {messages?.docs[messages.docs.length - 1]?.data().text ||
               'New Chat'}
         </p>
         <TrashIcon className='h-5 w-5 text-gray-700 hover:text-red-700' />
      </Link>
   )
}

export default ChatRow
