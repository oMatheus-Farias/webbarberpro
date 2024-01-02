import Link from 'next/link';
import { FiScissors, FiClipboard  } from 'react-icons/fi';
import { MdOutlineSettings } from "react-icons/md";

export function SidebarDasktop(){
  return(
    <div className='w-full max-w-56 min-h-screen py-8 bg-primary' >
      <h1 
        className='text-2xl font-extrabold text-white ml-8' 
      >
        Barber
        <span className='text-secondary' >PRO</span>
      </h1>

      <nav className='mt-10' >
        <ul className='flex flex-col text-white' >
          <li>
            <Link href='/dashboard' className='flex gap-4 items-center px-8 py-4 hover:bg-bg' >
              <FiScissors size={20} color='#FFF' />
              Agenda
            </Link>
          </li>
          <li>
            <Link href='/heircuts' className='flex gap-4 items-center px-8 py-4 hover:bg-bg' >
              <FiClipboard size={20} color='#FFF' />
              Cortes
            </Link>
          </li>
          <li>
            <Link href='/profile' className='flex gap-4 items-center px-8 py-4 hover:bg-bg' >
              <MdOutlineSettings size={20} color='#FFF' />
              Minha Conta
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};