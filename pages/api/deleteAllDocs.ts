import { NextApiRequest, NextApiResponse } from 'next'
import adminDb from '../../firebaseAdmin'
import deleteQueryBatch from '../../utils/deleteQueryBatch'

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { session } = req.body

   const collectionRef = adminDb.collection(
      `/users/${session?.user?.email}/chats`
   )
   const query = collectionRef.limit(500)

   await new Promise((resolve, reject) => {
      deleteQueryBatch(adminDb, query, resolve).catch(reject)
   })

   res.status(200).json({ message: 'Messages deleted successfully' })
}
