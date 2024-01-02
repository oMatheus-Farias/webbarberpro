import { useState } from 'react';
import { SidebarMobile } from '../sidebarMobile';
import { FiMenu } from 'react-icons/fi';

export function HeaderMobile(){
  const [openSidebar, setOpenSidebar] = useState(false);

  return(
    <>
      <header className='w-full px-4 py-5 h-20 flex items-center gap-7 bg-primary' >
        <button 
          className='px-[0.62em] py-2 border border-gray rounded-md bg-bg' 
          onClick={ () => setOpenSidebar(true) }
        >
          <FiMenu size={22} color='#FFF' />
        </button>

        <h1 
          className='text-2xl font-extrabold text-white' 
        >
          Barber
          <span className='text-secondary' >PRO</span>
        </h1>
      </header>

      <SidebarMobile close={ () => setOpenSidebar(false) } openSideBar={ openSidebar } />
    </>
  );
};