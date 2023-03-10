'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import {
   ArrowRightOnRectangleIcon,
   MoonIcon,
   SunIcon,
   TrashIcon,
} from '@heroicons/react/24/outline'
import { collection, orderBy, query } from 'firebase/firestore'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import ChatRow from './ChatRow'
import ModelSelection from './ModelSelection'
import NewChat from './NewChat'
import { useThemeContext } from '../contexts/ThemeContext'
import { ThemeActionType } from '../reducers/themeReducer'

type SideBarProps = {
   isMobile?: boolean
}

function SideBar({ isMobile = false }: SideBarProps) {
   const [isSureToDelete, setIsSureToDelete] = useState(false)
   const router = useRouter()
   const { state, dispatch } = useThemeContext()
   const { data: session } = useSession()
   const [chats, loading] = useCollection(
      session &&
         query(
            collection(db, 'users', session?.user?.email || '', 'chats'),
            orderBy('createdAt', 'desc')
         )
   )

   const handleDelete = async () => {
      if (session?.user?.email) {
         if (isSureToDelete) {
            await fetch('/api/deleteAllDocs', {
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ session }),
            }).then(() => {
               setIsSureToDelete(false)
               router.replace('/')
            })
         } else {
            setIsSureToDelete(true)
         }
      }
   }

   return (
      <div
         className={`p-2 flex flex-col h-screen bg-[#202123] overflow-y-hidden ${
            isMobile ? 'w-[20rem]' : 'w-[16rem]'
         }`}
      >
         <div className='mb-2 flex-1 border-b-[1px] border-[#343541] overflow-y-auto'>
            <div>
               <NewChat />
               <ModelSelection />
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
            <div className='space-y-1 text-white text-sm'>
               {!!chats?.docs.length && (
                  <button
                     type='button'
                     className='sidebarButton'
                     onClick={handleDelete}
                  >
                     {isSureToDelete ? (
                        <CheckIcon className='w-4 h-4' />
                     ) : (
                        <TrashIcon className='w-4 h-4' />
                     )}
                     <span>
                        {isSureToDelete
                           ? 'Confirm clear conversations'
                           : 'Clear conversations'}
                     </span>
                  </button>
               )}
               <button
                  type='button'
                  className='sidebarButton'
                  onClick={() =>
                     dispatch(
                        state.mode === 'light'
                           ? { type: ThemeActionType.DARK, payload: 'dark' }
                           : { type: ThemeActionType.LIGHT, payload: 'light' }
                     )
                  }
               >
                  {state.mode === 'light' ? (
                     <MoonIcon className='w-4 h-4' />
                  ) : (
                     <SunIcon className='w-4 h-4' />
                  )}
                  <span>{state.mode === 'light' ? 'Dark' : 'Light'} mode</span>
               </button>
               <button
                  type='button'
                  className='sidebarButton'
                  onClick={() => signOut()}
               >
                  <ArrowRightOnRectangleIcon className='w-4 h-4' />
                  <span>Log out</span>
               </button>
            </div>
         )}
      </div>
   )
}

// SideBar.defaultProps = {
//    isMobile: false,
// }

export default SideBar
