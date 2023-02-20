'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Logo from '../public/images/ChatGPTLogo.png'

function Login() {
   return (
      <div className='flex flex-col items-center justify-center text-center min-h-screen bg-[#11A37F]'>
         <Image
            src={Logo}
            width={300}
            height={300}
            alt='ChatGPT logo'
         />
         <button
            type='button'
            className='text-3xl font-bold animate-pulse text-white'
            onClick={() => signIn('google')}
         >
            Sign In to use ChatGPT
         </button>
      </div>
   )
}

export default Login
