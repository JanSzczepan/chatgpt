import { FieldValue } from 'firebase/firestore'
import { StaticImageData } from 'next/image'

type ChatGPT = {
   _id: 'ChatGPT'
   name: 'ChatGPT'
   avatar: StaticImageData
}

type User =
   | {
        _id: string
        name: string
        avatar: string
     }
   | ChatGPT

interface Message {
   text: string
   createdAt: FieldValue
   user: User
}
