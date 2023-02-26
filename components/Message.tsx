import { Message as MessageType } from '@/typings'
import { DocumentData } from 'firebase/firestore'
import { StaticImageData } from 'next/image'

type MessageProps = {
   message: DocumentData
}

function Message({ message }: MessageProps) {
   const { text, user } = message as MessageType
   const isChatGPT = user.name === 'ChatGPT'

   return (
      <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
         <div className='px-10 mx-auto max-w-2xl flex space-x-5'>
            <img
               src={
                  isChatGPT
                     ? (user.avatar as StaticImageData).src
                     : (user.avatar as string)
               }
               className='h-8 w-8 bg-auto'
               alt='profile'
            />
            <p className='pt-1 text-sm'>{text}</p>
         </div>
      </div>
   )
}

export default Message
