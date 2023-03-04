import {
   addDoc,
   collection,
   CollectionReference,
   FieldValue,
   serverTimestamp,
} from 'firebase/firestore'
import { Session } from 'next-auth'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { db } from '../firebase'

type NewChatDocType = {
   userId: string
   createdAt: FieldValue
}

const createNewChat = async (
   session: Session | null,
   router: AppRouterInstance
) => {
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

export default createNewChat
