import { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import queryApi from '../../utils/queryApi'
import { Message } from '../../typings'
import adminDb from '../../firebaseAdmin'
import ChatGPTLogo from '../../public/images/ChatGPTSmallLogo.png'

type Data = {
   answer: string
}

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const { prompt, model, id, session } = req.body

   if (!prompt) {
      res.status(400).json({ answer: 'Please provide a prompt!' })
      return
   }
   if (!id) {
      res.status(400).json({ answer: 'Please provide a valid chat id!' })
      return
   }

   const response = await queryApi(prompt, model)
   const message: Message = {
      text: response,
      createdAt: admin.firestore.Timestamp.now(),
      user: {
         _id: 'ChatGPT',
         name: 'ChatGPT',
         avatar: ChatGPTLogo,
      },
   }

   await adminDb
      .collection('users')
      .doc(session?.user?.email)
      .collection('chats')
      .doc(id)
      .collection('messages')
      .add(message)

   res.status(200).json({ answer: message.text })
}
