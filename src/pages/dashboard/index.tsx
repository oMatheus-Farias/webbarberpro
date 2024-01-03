import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

import Head from 'next/head';
import Link from 'next/link';
import { IoPerson } from 'react-icons/io5';

import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';

import { canSSRAuth } from '@/utils/canSSRAuth';

export default function Dashboard(){
  const { mobileScreen } = useContext(AuthContext);

  return(
    <>
      <Head>
        <title>BarberPRO - minha barbearia</title>
      </Head>
      <Container>
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}

        <div className='p-5 w-full max-w-[50em]' >
          <header className='flex items-center gap-3' >
            <h1 className='text-xl text-secondary font-bold lg:text-3xl' >Agenda</h1>

            <Link href='/new'>
              <button className='h-9 text-white font-bold bg-btnColor px-3 rounded' >
                Registrar
              </button>
            </Link>
          </header>

          <main className='w-full flex flex-col gap-4 mt-6' >
            <section className='w-full flex flex-col gap-3 rounded p-3 bg-primary lg:flex-row lg:items-center lg:justify-between' >
              <div className='flex items-center gap-3' >
                <IoPerson size={33} color='#FBB231' />
                <p className='text-white font-semibold' >Matheus Farias</p>
              </div>

              <p className='text-white font-semibold' >Corte Normal</p>
              <p className='text-white font-semibold' >R$ 45.00</p>
            </section>
            <section className='w-full flex flex-col gap-3 rounded p-3 bg-primary lg:flex-row lg:items-center lg:justify-between' >
              <div className='flex items-center gap-3' >
                <IoPerson size={33} color='#FBB231' />
                <p className='text-white font-semibold' >Matheus Farias</p>
              </div>

              <p className='text-white font-semibold' >Corte Normal</p>
              <p className='text-white font-semibold' >R$ 45.00</p>
            </section>
          </main>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});