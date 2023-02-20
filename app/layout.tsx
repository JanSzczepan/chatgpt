import { ReactNode } from 'react'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang='en'>
         <head />
         <body>
            <div className='flex'>
               <div className='bg-[#343541] flex-1'>{children}</div>
            </div>
         </body>
      </html>
   )
}
