import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import SessionProvider from '../components/SessionProvider'
import SideBar from '../components/SideBar'
import Login from '../components/Login'
import ClientProvider from '../components/ClientProvider'
import './globals.css'

export default async function RootLayout({
   children,
}: {
   children: ReactNode
}) {
   const session = await getServerSession(authOptions)

   return (
      <html lang='en'>
         <head />
         <body>
            <SessionProvider session={session}>
               {session ? (
                  <div className='flex'>
                     <div className='bg-[#202123] max-w-xs min-h-screen overflow-y-auto md:min-w-[20rem]'>
                        <SideBar />
                     </div>
                     <ClientProvider />
                     <div className='bg-[#343541] flex-1'>{children}</div>
                  </div>
               ) : (
                  <Login />
               )}
            </SessionProvider>
         </body>
      </html>
   )
}
