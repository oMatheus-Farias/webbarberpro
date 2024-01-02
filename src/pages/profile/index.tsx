import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Head from 'next/head';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';

export default function Profile(){
  const { mobileScreen } = useContext(AuthContext);

  return(
    <>
      <Head>
        <title>Minha Conta - BarberPRO</title>
      </Head>
      <div className='lg:flex' >
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}

        <main className='p-5 w-full max-w-[800px]' >
          <h1 className='text-3xl text-secondary font-bold' >Minha Conta</h1>

          <section className='w-full mt-6 bg-primary p-4 rounded' >
            <form className='w-full' >
              <label className='text-white font-bold' >Nome da barbearia:</label>
              <input
                className='w-full h-10 mt-3 rounded mb-5 font-semibold text-white bg-bg px-3 border border-gray' 
                type='text'
                value='Barbearia do seu Zé'
                onChange={() => {}}
              />
              <label className='text-white font-bold' >Endereço:</label>
              <input
                className='w-full h-10 mt-3 rounded mb-5 font-semibold text-white bg-bg px-3 border border-gray' 
                type='text'
                value='Rua silva, n29'
                onChange={() => {}}
              />
            </form>

            <div>
              <label className='text-white font-bold' >Seu plano:</label>
              <div className='w-full flex px-3 py-2 justify-between items-center h-10 border mt-3 border-gray rounded' >
                <p className='font-bold text-secondary' >Plano Premium</p>

                <button className='bg-green text-white text-sm font-bold px-2 py-1 rounded' >
                  Mudar Plano
                </button>
              </div>

              <div className='flex flex-col gap-4 w-full mt-4' >
                <button className='w-full rounded h-11 text-bg font-extrabold bg-secondary' >
                  Salvar
                </button>

                <button className='w-full rounded h-11 border border-red text-red' >
                  Sair da conta
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};