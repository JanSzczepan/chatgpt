import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

if (!process.env.GOOGLE_ID) {
   throw new Error('GOOGLE_ID is required')
}
if (!process.env.GOOGLE_SECRET) {
   throw new Error('GOOGLE_SECRET is required')
}
if (!process.env.NEXTAUTH_SECRET) {
   throw new Error('NEXTAUTH_SECRET is required')
}

export const authOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
      }),
   ],
}
export default NextAuth(authOptions)
