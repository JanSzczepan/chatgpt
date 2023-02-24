import { PlusIcon } from '@heroicons/react/24/solid'
import {
   addDoc,
   collection,
   CollectionReference,
   FieldValue,
   serverTimestamp,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { db } from '../firebase'

type NewChatDocType = {
   userId: string
   createdAt: FieldValue
}

function NewChat() {
   const router = useRouter()
   const { data: session } = useSession()

   const createNewChat = async () => {
      if (!session?.user?.email) return

      const doc = await addDoc<NewChatDocType>(
         collection(
            db,
            'users',
            session?.user?.email,
            'chats'
         ) as CollectionReference<NewChatDocType>,
         { userId: session?.user?.email, createdAt: serverTimestamp() }
      )

      router.push(`/chat/${doc.id}`)
   }

   return (
      <button
         type='button'
         className='border border-gray-700 chatRow w-full'
         onClick={createNewChat}
      >
         <PlusIcon className='h-4 w-4' />
         <p>New Chat</p>
      </button>
   )
}

export default NewChat
