'use client'

import { signOut, useSession } from 'next-auth/react'
import NewChat from './NewChat'

function SideBar() {
   const { data: session } = useSession()

   return (
      <div className='p-2 flex flex-col h-screen'>
         <div className='flex-1'>
            <div>
               <NewChat />
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
