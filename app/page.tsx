import {
   SunIcon,
   BoltIcon,
   ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { ForwardRefExoticComponent, SVGProps } from 'react'

type ContentType = {
   header: {
      icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      title: string
   }
   cards: string[]
}

const CONTENT: ContentType[] = [
   {
      header: { icon: SunIcon, title: 'Examples' },
      cards: [
         'Explain something to me',
         'What is a difference between a dog and a cat?',
         'What is the color of the sun?',
      ],
   },
   {
      header: { icon: BoltIcon, title: 'Capabilities' },
      cards: [
         'Change the ChatGPT Model to use',
         `Messages are stored in Firebase's Firestore`,
         'Hot toast notifications when ChatGPT is thinking',
      ],
   },
   {
      header: { icon: ExclamationTriangleIcon, title: 'Limitations' },
      cards: [
         'May occasionally generate incorrect information',
         'May occasionally produce harmful instructions or biased content',
         'Limited knowledge of the world and events after 2021',
      ],
   },
]

export default function Home() {
   return (
      <section className='flex flex-col items-center justify-center min-h-screen px-2 py-10 text-white'>
         <h1 className='text-5xl font-bold mb-20'>ChatGPT</h1>
         <div className='flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-2 text-center'>
            {CONTENT.map((item) => (
               <div key={item.header.title}>
                  <div className='flex flex-col items-center justify-center mb-5'>
                     <item.header.icon className='h-8 w-8' />
                     <h2>{item.header.title}</h2>
                  </div>
                  <div className='space-y-2'>
                     {item.cards.map((card) => (
                        <p
                           className='infoText'
                           key={card}
                        >
                           {card}
                        </p>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </section>
   )
}
