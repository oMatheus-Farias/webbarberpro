import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

import Head from 'next/head';
import Link from 'next/link';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';

import { FaChevronLeft } from "react-icons/fa";

export default function New(){
  const { mobileScreen } = useContext(AuthContext);

  return(
    <>
      <Head>
        <title>BarberPRO - Novo modelo de corte</title>
      </Head>
      <Container>
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}

        <div className='p-5 w-full max-w-[50em]' >
          <section className='flex items-center gap-4' >
            <Link href='/heircuts'>
              <button 
                className='h-6 text-white text-sm font-bold bg-btnColor px-3 rounded flex items-center gap-1' 
              >
                <FaChevronLeft size={14} color='#FFF' />
                Voltar
              </button>
            </Link>

            <h1 className='text-xl text-secondary font-bold lg:text-3xl' >Modelos de cortes</h1>
          </section>

          <main className='w-full bg-primary p-3 rounded mt-8 flex flex-col items-center' >
            <h2 className='text-white font-bold text-3xl' >Cadastrar modelo</h2>

            <form className='w-full mt-6' >
              <input
                className='w-full h-10 rounded mb-4 font-semibold text-white bg-bg px-3 border border-gray'
                type='text'
                name='name'
                placeholder='Nome do corte'
              />
              <input
                className='w-full h-10 rounded mb-4 font-semibold text-white bg-bg px-3 border border-gray'
                type='text'
                name='price'
                placeholder='Preço exemplo: 45.90'
              />

              <button 
                className='w-full rounded h-11 text-bg font-extrabold bg-secondary' 
                type='submit'
              >
                Cadastrar
              </button>
            </form>
          </main>
        </div>
      </Container>
    </>
  );
};