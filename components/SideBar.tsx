'use client'

import { collection, orderBy, query } from 'firebase/firestore'
import { signOut, useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import ChatRow from './ChatRow'
import ModelSelection from './ModelSelection'
import NewChat from './NewChat'

function SideBar() {
   const { data: session } = useSession()
   const [chats, loading] = useCollection(
      session &&
         query(
            collection(db, 'users', session?.user?.email || '', 'chats'),
            orderBy('createdAt', 'desc')
         )
   )

   return (
      <div className='p-2 flex flex-col h-screen'>
         <div className='flex-1'>
            <div>
               <NewChat />
               <div className='hidden sm:inline'>
                  <ModelSelection />
               </div>
               <div className='flex flex-col space-y-2 my-2'>
                  {loading && (
                     <div className='text-center text-white animate-pulse'>
                        <p>Loading Chats...</p>
                     </div>
                  )}
                  {chats?.docs.map((chat) => (
                     <ChatRow
                        id={chat.id}
                        key={chat.id}
                     />
                  ))}
               </div>
            </div>
         </div>
         {session && (
            <button
               type='button'
               className='mx-auto my-2 cursor-pointer'
               onClick={() => signOut()}
            >
               <img
                  src={
                     session.user?.image || '../public/images/UserProfile.png'
                  }
                  alt='User profile'
                  className='w-12 h-12 rounded-full hover:opacity-50'
               />
            </button>
         )}
      </div>
   )
}

export default SideBar
