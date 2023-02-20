import { Bars3Icon, PlusIcon } from '@heroicons/react/24/solid'

function Navbar() {
   return (
      <nav className='py-4 px-3 flex sm:hidden items-center justify-between text-white'>
         <Bars3Icon className='w-7 h-7' />
         <h3>New chat</h3>
         <PlusIcon className='w-7 h-7' />
      </nav>
   )
}

export default Navbar
