'use client'

import { ReactNode } from 'react'
import { Session } from 'next-auth'
import { SessionProvider as Provider } from 'next-auth/react'

type SessionProviderProps = {
   children: ReactNode
   session: Session | null
}

function SessionProvider({ children, session }: SessionProviderProps) {
   return <Provider session={session}>{children}</Provider>
}

export default SessionProvider
