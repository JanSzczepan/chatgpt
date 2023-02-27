import { DocumentData } from 'firebase/firestore'
import { StaticImageData } from 'next/image'
import { useThemeContext } from '../contexts/ThemeContext'
import { Message as MessageType } from '../typings'

type MessageProps = {
   message: DocumentData
}

function Message({ message }: MessageProps) {
   const { state } = useThemeContext()
   const { text, user } = message as MessageType
   const isChatGPT = user.name === 'ChatGPT'

   return (
      <div
         className={`py-5 ${
            state.mode === 'light' ? 'text-[#343541]' : 'text-white'
         } ${
            isChatGPT &&
            (state.mode === 'light'
               ? 'bg-[#F7F7F8] border-y-[1px] border-[#E5E5E5]'
               : 'bg-[#434654]')
         }`}
      >
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
