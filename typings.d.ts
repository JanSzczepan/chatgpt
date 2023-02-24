import { FieldValue } from 'firebase/firestore'
import { StaticImageData } from 'next/image'

interface Message {
   text: string
   createdAt: FieldValue
   user: {
      _id: string
      name: string
      avatar: string | StaticImageData
   }
}
