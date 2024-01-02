import { IoMdClose } from 'react-icons/io';
import { FiScissors, FiClipboard  } from 'react-icons/fi';
import { MdOutlineSettings } from "react-icons/md";
import Link from 'next/link';

export function SidebarMobile({ close, openSideBar }){
  return(
    <div 
      className="w-full min-h-screen absolute top-0 left-0 transition-all bg-primary z-10" 
      style={{ transform: openSideBar ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <header className='w-full px-4 py-5 h-20 flex items-center justify-between' >
        <h1 
          className='text-2xl font-extrabold text-white' 
        >
          Barber
          <span className='text-secondary' >PRO</span>
        </h1>

        <button 
          className='px-[0.62em] py-2 border border-gray rounded-md bg-bg'        
          onClick={ close } 
        >
          <IoMdClose size={22} color='#FFF' />
        </button>
      </header>

      <nav className='mt-6' >
        <ul className='flex flex-col text-white' >
          <li>
            <Link href='/dashboard' className='flex gap-4 items-center p-4 hover:bg-bg' >
              <FiScissors size={20} color='#FFF' />
              Agenda
            </Link>
          </li>
          <li>
            <Link href='/heircuts' className='flex gap-4 items-center p-4 hover:bg-bg' >
              <FiClipboard size={20} color='#FFF' />
              Cortes
            </Link>
          </li>
          <li>
            <Link href='/profile' className='flex gap-4 items-center p-4 hover:bg-bg' >
              <MdOutlineSettings size={20} color='#FFF' />
              Minha Conta
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};