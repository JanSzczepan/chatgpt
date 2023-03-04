import { PlusIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import createNewChat from '../utils/createNewChat'

function NewChat() {
   const router = useRouter()
   const { data: session } = useSession()

   return (
      <button
         type='button'
         className='border border-gray-700 chatRow w-full'
         onClick={() => createNewChat(session, router)}
      >
         <PlusIcon className='h-4 w-4' />
         <p>New Chat</p>
      </button>
   )
}

export default NewChat
