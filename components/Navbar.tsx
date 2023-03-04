'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { Bars3Icon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import SideBar from './SideBar'
import { useThemeContext } from '../contexts/ThemeContext'
import createNewChat from '../utils/createNewChat'

function Navbar() {
   const [isOpen, setIsOpen] = useState(false)
   const { state } = useThemeContext()
   const pathname = usePathname()
   const router = useRouter()
   const { data: session } = useSession()

   useEffect(() => {
      setIsOpen(false)
   }, [pathname])

   return (
      <nav className='md:hidden text-white'>
         <div
            className={`flex py-3 px-3 items-center justify-between bg-[#343541] ${
               state.mode === 'dark' && 'border-b-[1px] border-[#5D5D67]'
            }`}
         >
            <button
               type='button'
               className='cursor-pointer'
               onClick={() => setIsOpen(true)}
            >
               <Bars3Icon className='w-6 h-6' />
            </button>
            <h3>New chat</h3>
            <button
               type='button'
               className='cursor-pointer'
               onClick={() => createNewChat(session, router)}
            >
               <PlusIcon className='w-5 h-5' />
            </button>
         </div>
         {isOpen && (
            <div className='fixed z-10 inset-0 bg-gray-600 bg-opacity-75 opacity-100' />
         )}
         <div
            className={`fixed flex top-0 -left-full bottom-0 w-screen z-50 ease-in-out duration-300 ${
               isOpen ? 'translate-x-full' : 'translate-x-0'
            }`}
         >
            <SideBar isMobile />
            <div
               className='flex-1'
               onClick={() => setIsOpen(false)}
               onKeyDown={() => setIsOpen(false)}
               role='presentation'
            >
               <button
                  type='button'
                  className='self-start p-5 cursor-pointer'
                  onClick={() => setIsOpen(false)}
               >
                  <XMarkIcon className='h-6 w-6' />
               </button>
            </div>
         </div>
      </nav>
   )
}

export default Navbar
