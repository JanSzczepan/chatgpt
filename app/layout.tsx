import { ReactNode } from 'react'
import SideBar from '../components/SideBar'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang='en'>
         <head />
         <body>
            <div className='flex'>
               <div className='bg-[#202123] max-w-xs min-h-screen overflow-y-auto md:min-w-[20rem]'>
                  <SideBar />
               </div>
               <div className='bg-[#343541] flex-1'>{children}</div>
            </div>
         </body>
      </html>
   )
}
