import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import SessionProvider from '../components/SessionProvider'
import Login from '../components/Login'
import { ThemeContextProvider } from '../contexts/ThemeContext'
import ClientProvider from '../components/ClientProvider'
import SideBar from '../components/SideBar'
import Navbar from '../components/Navbar'
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
                     <div className='flex flex-col md:flex-row h-screen'>
                        <Navbar />
                        <div className='hidden md:block h-screen'>
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
