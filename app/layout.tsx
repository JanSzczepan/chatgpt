import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import SessionProvider from '../components/SessionProvider'
import Login from '../components/Login'
import { ThemeContextProvider } from '../contexts/ThemeContext'
import ClientProvider from '../components/ClientProvider'
import SideBar from '../components/SideBar'
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
               <ThemeContextProvider>
                  {session ? (
                     <div className='flex'>
                        <div className='bg-[#202123] max-w-xs min-h-screen overflow-y-auto md:min-w-[20rem]'>
                           <SideBar />
                        </div>
                        <ClientProvider />
                        {children}
                     </div>
                  ) : (
                     <Login />
                  )}
               </ThemeContextProvider>
            </SessionProvider>
         </body>
      </html>
   )
}
